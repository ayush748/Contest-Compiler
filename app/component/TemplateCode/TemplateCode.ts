export const templateProgram = {
  python: {
    "codeforces multi input": `import sys
input = sys.stdin.readline

def solve():
    # Your logic for a single test case goes here
    n = int(input())
    print(n * 2)  # sample output

t = int(input())
for _ in range(t):
    solve()
`,
    "hello world": `print("Hello, World!")`,
    "none": ""
  },

  cpp: {
    "codeforces multi input": `#include <bits/stdc++.h>
using namespace std;

void solve() {
    int n;
    cin >> n;
    cout << n * 2 << "\\n"; // sample output
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    cin >> t;
    while (t--) solve();
    return 0;
}
`,
    "hello world": `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    "none": ""
  },

  java: {
    "codeforces multi input": `import java.io.*;
import java.util.*;

public class Main {
    static FastScanner fs = new FastScanner();

    public static void solve() {
        int n = fs.nextInt();
        System.out.println(n * 2);
    }

    public static void main(String[] args) {
        int t = fs.nextInt();
        while (t-- > 0) solve();
    }

    static class FastScanner {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        String next() {
            while (st == null || !st.hasMoreElements()) {
                try { st = new StringTokenizer(br.readLine()); }
                catch (IOException e) { e.printStackTrace(); }
            }
            return st.nextToken();
        }
        int nextInt() { return Integer.parseInt(next()); }
    }
}
`,
    "hello world": `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    "none": ""
  },

  javascript: {
    "codeforces multi input": `const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
let idx = 0;

const next = () => input[idx++];

function solve() {
  const n = parseInt(next());
  console.log(n * 2);
}

const t = parseInt(next());
for (let i = 0; i < t; i++) solve();
`,
    "hello world": `console.log("Hello, World!");`,
    "none": ""
  },

  typescript: {
    "codeforces multi input": `import * as fs from "fs";
const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/);
let idx = 0;

const next = () => input[idx++];

function solve() {
  const n = parseInt(next()!);
  console.log(n * 2);
}

const t = parseInt(next()!);
for (let i = 0; i < t; i++) solve();
`,
    "hello world": `console.log("Hello, World!");`,
    "none": ""
  },

  c: {
    "codeforces multi input": `#include <stdio.h>

void solve() {
    int n;
    scanf("%d", &n);
    printf("%d\\n", n * 2);
}

int main() {
    int t;
    scanf("%d", &t);
    while (t--) solve();
    return 0;
}
`,
    "hello world": `#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    "none": ""
  },

  "c#": {
    "codeforces multi input": `using System;

class Program {
    static void Solve() {
        int n = int.Parse(Console.ReadLine());
        Console.WriteLine(n * 2);
    }

    static void Main() {
        int t = int.Parse(Console.ReadLine());
        while (t-- > 0) Solve();
    }
}
`,
    "hello world": `using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
    "none": ""
  },

  golang: {
    "codeforces multi input": `package main

import (
    "bufio"
    "fmt"
    "os"
)

var in = bufio.NewReader(os.Stdin)

func solve() {
    var n int
    fmt.Fscan(in, &n)
    fmt.Println(n * 2)
}

func main() {
    var t int
    fmt.Fscan(in, &t)
    for ; t > 0; t-- {
        solve()
    }
}
`,
    "hello world": `package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,
    "none": ""
  },

  rust: {
    "codeforces multi input": `use std::io::{self, Read};

fn solve(n: i32) {
    println!("{}", n * 2);
}

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let t: i32 = iter.next().unwrap().parse().unwrap();
    for _ in 0..t {
        let n: i32 = iter.next().unwrap().parse().unwrap();
        solve(n);
    }
}
`,
    "hello world": `fn main() {
    println!("Hello, World!");
}`,
    "none": ""
  }
};
