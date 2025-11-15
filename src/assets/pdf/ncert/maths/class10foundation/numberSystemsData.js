export const numberSystemsData = {
  title: "Chapter 1: Number Systems",
  totalPages: 9,
  sections: [
    {
      page: 1,
      title: "Introduction to Number Systems",
      content: `
The study of numbers and their properties. Number system is a way to represent numbers using digits and symbols.

Types of Numbers:
• Natural Numbers (N): 1, 2, 3, 4, ...
• Whole Numbers (W): 0, 1, 2, 3, ...
• Integers (Z): ..., -3, -2, -1, 0, 1, 2, 3, ...
• Rational Numbers (Q): Numbers that can be expressed as p/q, where p and q are integers and q ≠ 0.
• Irrational Numbers: Numbers that cannot be expressed as p/q (e.g., √2, π).
• Real Numbers (R): All rational and irrational numbers.
      `,
    },
    {
      page: 2,
      title: "Natural, Whole, Integers and Their Representation",
      content: `
Natural Numbers (N):
- Counting numbers starting from 1.
- N = {1, 2, 3, ...}

Whole Numbers (W):
- All natural numbers + 0.
- W = {0, 1, 2, 3, ...}

Integers (Z):
- Includes negative numbers, 0, and positive numbers.
- Z = {..., -3, -2, -1, 0, 1, 2, 3, ...}

Representation on Number Line:
- Zero at the center, positive to right, negatives to left.
      `,
    },
    {
      page: 3,
      title: "Rational Numbers",
      content: `
Rational Numbers (Q):
- Any number expressible as p/q, where p and q are integers and q ≠ 0.
- Examples: 1/2, -3/4, 5 (as 5/1), 0 (as 0/1).

Properties:
• Rational numbers are dense — between any two rationals, another exists.
• Decimals: Either terminating (e.g. 0.5) or non-terminating repeating (e.g. 0.333...).

Standard Form:
- A rational number is in standard form if denominator is positive and GCD of numerator and denominator is 1.
      `,
    },
    {
      page: 4,
      title: "Irrational Numbers",
      content: `
Irrational Numbers:
- Numbers which cannot be written as p/q.
- Non-terminating, non-repeating decimals.
- Examples: √2, √3, π, 0.101001000100001...

Proof that √2 is irrational:
Assume √2 = p/q (p and q are coprime).
=> 2 = p^2/q^2 => p^2 = 2q^2
=> p is even, so p = 2k. Put in above, get contradiction.
Hence, √2 is irrational.
      `,
    },
    {
      page: 5,
      title: "Real Numbers and Their Properties",
      content: `
Real Numbers (R):
- All rational and irrational numbers.
- Represented on the number line.

Properties:
• Closure: Rational numbers closed under +, -, ×, ÷ (except division by 0).
• Commutativity, Associativity, Distributivity.

Decimal Expansion:
- Terminating, non-terminating repeating (rationals)
- Non-terminating, non-repeating (irrationals)

Visualizing Real Numbers on Number Line using successive magnification.
      `,
    },
    {
      page: 6,
      title: "Operations on Real Numbers",
      content: `
Addition, Subtraction, Multiplication, Division:
• Rational numbers: Result always rational (except division by zero).
• Irrational + rational or irrational ≠ always irrational.

Laws:
• a + b = b + a (commutative law for addition)
• a × b = b × a (commutative law for multiplication), etc.

Examples:
• (√2 + 3) is irrational.
• (2/3 + 5/7) is rational.
      `,
    },
    {
      page: 7,
      title: "Representation of Recurring Decimals and Rational/Irrational",
      content: `
Terminating Decimals: Decimal expansion comes to an end.
Example: 0.25 = 1/4

Non-terminating, recurring: Decimal repeats after some digits.
Example: 0.333... = 1/3

Distinguishing between rational and irrational from their decimal expansion.
      `,
    },
    {
      page: 8,
      title: "Rationalization, Surds and Simplification",
      content: `
Rationalization:
- Removing the surd from denominator
Example: 1/√2 is rationalized by multiplying numerator and denominator by √2.

Surds:
- Root form not exactly soluble (e.g. √5, 2√3).

Simplification Examples:
• √2 × √8 = √16 = 4
• Rationalize: (3/√5) = (3√5)/5
      `,
    },
    {
      page: 9,
      title: "Key Concepts, Summary & Important Points",
      content: `
KEY CONCEPTS:
• Types of numbers and sets (N, W, Z, Q, R)
• Dense property of rationals
• Irrational numbers and their proofs (e.g. √2)
• Real numbers form a continuum on number line
• Decimal representation helps in identification
• Rationalizing denominators

CHAPTER SUMMARY:
✓ Number system forms the foundation of mathematics.
✓ Rational and irrational numbers together make real numbers.
✓ Every point on the number line corresponds to a real number and vice-versa.
✓ Decimal representations help to distinguish between rationals and irrationals.
✓ Rationalization is a vital operation for simplification in higher mathematics.

PRACTICAL APPLICATIONS:
• Currency calculations
• Measurements (length, area, etc.)
• Engineering, computing, daily life maths
      `,
    },
  ],
};
