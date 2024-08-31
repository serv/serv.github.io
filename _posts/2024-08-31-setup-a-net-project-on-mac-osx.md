---
layout: post
title: Setup a .NET project on Mac OSX
date: 2024-08-31T10:03:43-07:00
comments: true
categories: []
---

We will create a new .NET project on Mac OSX using VSCode.

# Setup .NET Development environment

1. Follow instructions on this [link](https://dev.to/rusydy/setting-up-net-on-macos-a-step-by-step-guide-14db).

## Updating to the latest .NET environment 

There's a chance that you had prepped .NET development environment years ago. In such case, we want to update to the latest .NET development environment.

1. Update Homebrew
  - `$ brew update`
2. Install .NET using Homebrew
  - `$ brew install --cask dotnet-sdk`
3. If you already had installed it before but want to get the latest,
  - `$ brew upgrade dotnet-sdk`
4. Verify
  - `$ dotnet --version`
  - Should 8.0.401 as of Aug 31, 2024

# Setup a .NET project

- I am following the [instruction here](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test).
- If you want to follow the same instructions with my concise commentary, follow instructions below.

1. Create a .NET project (aka "Solution")
  - `$ dotnet new sln -o project-with-tests`
2. `cd project-with-tests`
3. Creates a new class library project in the SuperMassive folder.
  - `dotnet new classlib -o SuperMassive`
4. Rename Class1.cs to SuperMassive.cs.
5. Inside the project, have the following content.
  ```csharp
  namespace SuperMassiveNS;

  public class SuperMassive
  {

  }
  ```
  - Notice that the namespace is `SuperMassiveNS` in order to avoid collision with the class name.
6. Build
  - `$ dotnet build`
7. Add class library to the solution
  - `$ dotnet sln add ./SuperMassive/SuperMassive.csproj`
8. Create tests
  - `$ dotnet new xunit -o SuperMassive.Tests`
9. Add the tests to the solution
  - `$ dotnet sln add ./SuperMassive.Tests/SuperMassive.Tests.csproj`
10. Add SuperMassive as a dependency to SuperMassive.Tests
  - `$ dotnet add ./SuperMassive.Tests/SuperMassive.Tests.csproj reference ./SuperMassive/SuperMassive.csproj`  
11. Create a test to check that the tests can reference the source class.
  - Rename the test file name
    - SuperMassiveTests.cs
  - Update the content of the test
    ```csharp
    namespace SuperMassive.Tests;

    public class SuperMassiveTests
    {
        [Fact]
        public void ReferenceSourceTest()
        {
            var superMassive = new SuperMassiveNS.SuperMassive();
        }
    }
    ```
12. Run the tests!
  - `$ dotnet test`

# Adding more source files and tests

1. Go into the source project directory.
  - `$ cd SuperMassive`
2. Add a new class.
  - `$ dotnet new class -n Adder`
3. Update the class
  ```csharp
  namespace SuperMassive;

  public class Adder
  {
    public int add(int i, int j) {
      return i + j;
    }
  }
  ```
4. Go into the test project directory.
5. Add a new test.
  - `$ dotnet new class -n AdderTests`
6. Update the test class
  ```csharp
  namespace SuperMassive.Tests;

  public class AdderTests
  {
    [Fact]
    public void AddTest()
    {
      var adder = new SuperMassive.Adder();
      int result = adder.add(1, 1);
      Assert.Equal(2, result);
    }
  }
  ```
  - Make sure to add `[Fact]`
    - Attribute that is applied to a method to indicate that it is a fact that should be run by the test runner.
7. Run tests
  - `$ dotnet test`
  - Now you should see 2 tests running
    - `Passed!  - Failed:     0, Passed:     2, Skipped:     0, Total:     2, Duration: 1 ms - SuperMassive.Tests.dll (net8.0)`

