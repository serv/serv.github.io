---
layout: post
title: Basic Concurrency in Java
date: 2025-07-10T09:43:48-07:00
comments: true
categories: ["Java", "Concurrency"]
---

Let's review basic concurrency concepts in Java.

## Process vs Thread

Processes are like having multiple programs running at the same time. Each program is a process.

Threads are like a single program running concurrently. A process can have multiple threads.

| Feature          | Process          | Thread           |
|------------------|------------------|------------------|
| Memory           | Isolated         | Shared           |
| Creation Cost    | High             | Low              |
| Communication    | Slow (IPC)       | Fast (shared mem)|
| Crash Effect     | Only this process dies | Can kill the process the thread belongs to |

## Concurrency vs Parellalism

| Feature          | Concurrency                          | Parallelism                          |
|------------------|--------------------------------------|--------------------------------------|
| **Definition**   | Dealing with multiple tasks at once (may or may not execute simultaneously) | Executing multiple tasks *simultaneously* |
| **Execution**    | Tasks make progress together (interleaved) | Tasks run at *exact same time* (on multiple cores) |
| **Hardware**     | Possible on single-core CPU           | Requires multi-core CPU/distributed systems |
| **Goal**         | Manage many tasks efficiently         | Speed up computation                 |
| **Example**      | Handling 1000 web requests on a server (switching between them) | Rendering 4K video by splitting frames across 8 CPU cores |

## Problems in Concurrency

1. Race Condition:
When two threads access shared data at the same time, leading to unpredictable results.
2. Deadlock: 
When two threads block each other forever because each holds a resource the other needs.
3. Starvation:
When a thread never gets CPU time because others always take priority. For example, a low-priority thread never running because high-priority threads keep executing.
4. Livelock:
Threads keep retrying but make no progress (like two people trying to pass each other but always stepping aside the same way).

## Synchronization Basics

### Mutex (Lock)

#### Without a lock

```java
public class MutexLockNotUsed {
	private static int counter = 0;

	public static void main(String[] args) throws InterruptedException {
		Thread t1 = new Thread(() -> incrementCounter(10000));
		Thread t2 = new Thread(() -> incrementCounter(10000));

		t1.start();
		t2.start();

		t1.join();
		t2.join();

		System.out.println("Final counter value without lock: " + counter); // Likely less than 20000
	}

	private static void incrementCounter(int times) {
		for (int i = 0; i < times; i++) {
			counter++; // UNSAFE! No synchronization
		}
	}
}
```

When you write counter++, it looks like a single operation, but the CPU actually performs three distinct steps:

- READ the current value from memory into a register
- INCREMENT the value in the register
- WRITE the new value back to memory

Imagine Thread A and Thread B both executing counter++ when counter starts at 0:

```
Thread A: Reads counter (0)
Thread B: Reads counter (0)  ← Both threads see 0!
Thread A: Writes 1           ← Now memory = 1
Thread B: Writes 1           ← Overwrites with 1 again!
```

Instead of reaching 2, we only get 1 - we've lost an increment.

#### With a lock

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class MutexLock {
	private static int counter = 0;
	private static final Lock lock = new ReentrantLock();

	public static void main(String[] args) throws InterruptedException {
		Thread t1 = new Thread(() -> incrementCounter(10000));
		Thread t2 = new Thread(() -> incrementCounter(10000));

		t1.start();
		t2.start();

		t1.join();
		t2.join();

		System.out.println("Final counter value: " + counter); // Should be 20000
	}

	private static void incrementCounter(int times) {
		for (int i = 0; i < times; i++) {
			lock.lock();
			try {
				counter++;
			} finally {
				lock.unlock();
			}
		}
	}
}
```

The lock ensures thread safety by preventing concurrent access to the shared `counter` variable.

- Mutual Exclusion: When one thread acquires the lock with `lock.lock()`, other threads must wait until the lock is released before they can access the protected code section.
- Atomic Operations: The `try-finally` block ensures the lock is always released, preventing deadlocks while maintaining atomicity of the counter increment operation.
- Memory Visibility: The lock establishes a happens-before relationship, ensuring changes made by one thread are visible to others after the lock is released.

### Semaphore

#### Without a semaphore

```java
public class WithoutSemaphore {
	private static final int MAX_CONCURRENT_DOWNLOADS = 3;
	private static AtomicInteger currentDownloads = new AtomicInteger(0);

	public static void main(String[] args) {
		// Simulate 10 users trying to download
		for (int i = 1; i <= 10; i++) {
			int finalI = i;
			new Thread(() -> downloadFile("User-" + finalI)).start();
		}
	}

	static void downloadFile(String user) {
		int downloads = currentDownloads.incrementAndGet();

		// Check if limit is exceeded (but it's too late!)
		if (downloads > MAX_CONCURRENT_DOWNLOADS) {
			System.err.println(user + " FAILED: Too many downloads (" + downloads + ")");
		} else {
			System.out.println(user + " started downloading... [Active: " + downloads + "]");
		}

		// Simulate download time
		try { Thread.sleep(2000); }
		catch (InterruptedException e) { e.printStackTrace(); }

		currentDownloads.decrementAndGet();
		System.out.println(user + " finished downloading.");
	}
}
```

This code produces a log like below

```
User-3 started downloading... [Active: 2]
User-6 started downloading... [Active: 3]
User-7 started downloading... [Active: 1]
User-10 FAILED: Too many downloads (10)
User-5 FAILED: Too many downloads (8)
User-2 FAILED: Too many downloads (5)
User-9 FAILED: Too many downloads (9)
User-1 FAILED: Too many downloads (7)
User-8 FAILED: Too many downloads (6)
User-4 FAILED: Too many downloads (4)
```

#### With a semaphore

```java
public class WithSemaphore {
	private static final Semaphore semaphore = new Semaphore(3); // Allow 3 at a time

	public static void main(String[] args) {
		for (int i = 1; i <= 10; i++) {
			int finalI = i;
			new Thread(() -> downloadFile("User-" + finalI)).start();
		}
	}

	static void downloadFile(String user) {
		try {
			semaphore.acquire(); // Blocks if >3 downloads
			System.out.println(user + " started downloading... [Active: " + (3 - semaphore.availablePermits()) + "]");

			Thread.sleep(2000); // Simulate download

		} catch (InterruptedException e) {
			e.printStackTrace();
		} finally {
			semaphore.release();
			System.out.println(user + " finished downloading.");
		}
	}
}
```

With a semaphore, we can ensure that only 3 downloads happen a time.

### Producer Consumer

#### Without lock

```java
public class UnsafeProducerConsumer {
    private static final int CAPACITY = 5;
    private static final Queue<Integer> queue = new LinkedList<>();

    public static void main(String[] args) {
        new Thread(UnsafeProducerConsumer::produce).start();
        new Thread(UnsafeProducerConsumer::consume).start();
    }

    private static void produce() {
        int value = 0;
        while (true) {
            // BROKEN: No synchronization
            if (queue.size() < CAPACITY) { // Race condition here
                queue.offer(value);
                System.out.println("Produced: " + value);
                value++;
            }
            // Missing: Condition signaling
        }
    }

    private static void consume() {
        while (true) {
            // BROKEN: No synchronization
            if (!queue.isEmpty()) { // Race condition here
                int value = queue.poll();
                System.out.println("Consumed: " + value);
            }
            // Missing: Condition signaling
        }
    }
}
```

This may cause the producer to produce more than the limit of the queue size.

```
Produced: 0
Produced: 1
Produced: 2
Produced: 3
Produced: 4
Produced: 5 <- greater than the queue size limit of 5.
```

### With lock

```java
public class SafeProducerConsumer {
	private static final int CAPACITY = 5;
	private static final Queue<Integer> queue = new LinkedList<>();
	private static final Lock lock = new ReentrantLock();
	private static final Condition notFull = lock.newCondition();
	private static final Condition notEmpty = lock.newCondition();

	public static void main(String[] args) {
		Thread producer = new Thread(SafeProducerConsumer::produce);
		Thread consumer = new Thread(SafeProducerConsumer::consume);

		producer.start();
		consumer.start();
	}

	private static void produce() {
		int value = 0;
		while (true) {
			lock.lock();
			try {
				while (queue.size() == CAPACITY) {
					System.out.println("Queue full, producer waiting...");
					notFull.await();
				}
				queue.offer(value);
				System.out.println("Produced: " + value);
				value++;
				notEmpty.signal(); // Wake up consumer
				Thread.sleep(500); // Slow down producer
			} catch (InterruptedException e) {
				e.printStackTrace();
			} finally {
				lock.unlock();
			}
		}
	}

	private static void consume() {
		while (true) {
			lock.lock();
			try {
				while (queue.isEmpty()) {
					System.out.println("Queue empty, consumer waiting...");
					notEmpty.await();
				}
				int value = queue.poll();
				System.out.println("Consumed: " + value);
				notFull.signal(); // Wake up producer
				Thread.sleep(1000); // Slow down consumer
			} catch (InterruptedException e) {
				e.printStackTrace();
			} finally {
				lock.unlock();
			}
		}
	}
}
```

The lock ensures that the producer doesn't enqueue greater than the limit of the queue.

```
Produced: 0
Produced: 1
Produced: 2
Produced: 3
Produced: 4
Queue full, producer waiting...
Consumed: 0
```