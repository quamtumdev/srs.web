export const chapter1motionData = {
  title: "Chapter 1: Motion",
  totalPages: 15,
  sections: [
    {
      page: 1,
      title: "Introduction to Motion",
      content: `Motion is everywhere around us. When we walk, run, or ride a bicycle, we are in motion. Even when we are sitting, the Earth is moving around the Sun. Motion is defined as the change in position of an object with respect to time.

What is Motion?
- Motion is the change in position of an object with time
- It is relative - depends on the frame of reference
- An object may be at rest in one frame and in motion in another

Examples of Motion:
• A car moving on a road
• A bird flying in the sky  
• The motion of planets around the Sun
• The pendulum of a clock`,
    },
    {
      page: 2,
      title: "Types of Motion",
      content: `There are different types of motion based on the path followed by the moving object:

1. Linear Motion (Rectilinear Motion):
   - Motion along a straight line
   - Example: A car on a straight road

2. Circular Motion:
   - Motion along a circular path
   - Example: Motion of hands of a clock

3. Rotational Motion:
   - Motion about an axis
   - Example: Spinning of a top

4. Oscillatory Motion:
   - To and fro motion about a mean position
   - Example: Pendulum of a clock

5. Random Motion:
   - Motion with no fixed direction
   - Example: Motion of gas molecules`,
    },
    {
      page: 3,
      title: "Rest and Motion",
      content: `Rest and Motion are relative terms:

Rest:
- An object is said to be at rest if it does not change its position with time
- Example: A book on a table is at rest with respect to the table

Motion:
- An object is said to be in motion if it changes its position with time
- Example: A moving car is in motion with respect to the road

Frame of Reference:
- A system of coordinates used to describe the position of an object
- Motion and rest are relative to the frame of reference chosen

Example: A passenger sitting in a moving train is:
- At rest with respect to the train
- In motion with respect to the platform`,
    },
    {
      page: 4,
      title: "Distance and Displacement",
      content: `Distance:
- The total path length covered by an object
- It is a scalar quantity (has only magnitude)
- Always positive
- Depends on the actual path taken

Displacement:
- The shortest distance between initial and final positions
- It is a vector quantity (has magnitude and direction)
- Can be positive, negative, or zero
- Independent of the path taken

Key Differences:
┌─────────────┬──────────────┬───────────────┐
│   Property  │   Distance   │ Displacement  │
├─────────────┼──────────────┼───────────────┤
│    Type     │    Scalar    │    Vector     │
│    Value    │ Always +ve   │  +ve/-ve/0    │
│ Path depend │     Yes      │      No       │
│  Magnitude  │ Distance≥|Displacement|    │
└─────────────┴──────────────┴───────────────┘

Example: If you walk 3m east, then 4m north:
Distance = 3 + 4 = 7m
Displacement = √(3² + 4²) = 5m (northeast)`,
    },
    {
      page: 5,
      title: "Speed and Velocity",
      content: `Speed:
- Distance traveled per unit time
- Formula: Speed = Distance/Time
- It is a scalar quantity
- Always positive
- Unit: m/s, km/h

Types of Speed:
• Uniform Speed: Constant speed
• Non-uniform Speed: Variable speed
• Average Speed: Total distance/Total time
• Instantaneous Speed: Speed at any instant

Velocity:
- Displacement per unit time
- Formula: Velocity = Displacement/Time
- It is a vector quantity
- Can be positive, negative, or zero
- Unit: m/s (with direction)

Types of Velocity:
• Uniform Velocity: Constant velocity
• Non-uniform Velocity: Variable velocity
• Average Velocity: Total displacement/Total time
• Instantaneous Velocity: Velocity at any instant

Key Difference:
Speed tells "how fast" - Velocity tells "how fast and in which direction"`,
    },
    {
      page: 6,
      title: "Acceleration",
      content: `Acceleration:
- Rate of change of velocity with respect to time
- Formula: a = (v - u)/t
- Where: a = acceleration, v = final velocity, u = initial velocity, t = time
- It is a vector quantity
- Unit: m/s²

Types of Acceleration:

1. Positive Acceleration:
   - When velocity increases with time
   - Example: A car speeding up

2. Negative Acceleration (Deceleration/Retardation):
   - When velocity decreases with time
   - Example: A car braking

3. Zero Acceleration:
   - When velocity remains constant
   - Example: A car moving at constant speed

4. Uniform Acceleration:
   - When acceleration remains constant
   - Example: Free fall under gravity

5. Non-uniform Acceleration:
   - When acceleration changes with time
   - Example: A car in city traffic

Note: If an object moves with constant velocity, its acceleration is zero.`,
    },
    {
      page: 7,
      title: "Equations of Motion",
      content: `For objects moving with uniform acceleration, we have three equations of motion:

First Equation of Motion:
v = u + at

Where:
v = final velocity
u = initial velocity  
a = acceleration
t = time

Second Equation of Motion:
s = ut + ½at²

Where:
s = displacement

Third Equation of Motion:
v² = u² + 2as

These equations are valid only when:
• The motion is along a straight line
• The acceleration is constant (uniform)

Derivation Methods:
1. Graphical method (using velocity-time graphs)
2. Calculus method
3. Algebraic method

Applications:
• Problems involving uniformly accelerated motion
• Motion under gravity
• Motion of vehicles with constant acceleration`,
    },
    {
      page: 8,
      title: "Graphical Representation of Motion",
      content: `Motion can be represented graphically using different types of graphs:

1. Position-Time (s-t) Graph:
   - Shows how position changes with time
   - Slope gives velocity
   - Straight line: uniform velocity
   - Curved line: non-uniform velocity

2. Velocity-Time (v-t) Graph:
   - Shows how velocity changes with time
   - Slope gives acceleration
   - Area under curve gives displacement
   - Horizontal line: constant velocity (zero acceleration)
   - Inclined line: uniform acceleration

3. Acceleration-Time (a-t) Graph:
   - Shows how acceleration changes with time
   - Area under curve gives change in velocity

Information from v-t Graph:
• Initial velocity: y-intercept
• Final velocity: value at time t
• Acceleration: slope of the line
• Displacement: area under the curve

For uniform motion: v-t graph is a horizontal line
For uniformly accelerated motion: v-t graph is a straight inclined line`,
    },
    {
      page: 9,
      title: "Uniform Motion",
      content: `Uniform Motion:
An object is said to be in uniform motion if it covers equal distances in equal intervals of time, however small these intervals may be.

Characteristics:
• Constant velocity
• Zero acceleration
• Equal displacement in equal time intervals
• Straight line motion with constant speed

Examples:
• A car moving at constant speed on a straight road
• Motion of hands of a clock
• A train moving at uniform speed

Position-Time Graph for Uniform Motion:
- Straight line passing through origin (if motion starts from origin)
- Slope = velocity (constant)

Velocity-Time Graph for Uniform Motion:  
- Horizontal line parallel to time axis
- Height of line = constant velocity
- Area under line = displacement

Mathematical Representation:
If velocity = v (constant)
Then: s = vt (where s = displacement, t = time)

Key Point: In uniform motion, average velocity = instantaneous velocity = constant velocity`,
    },
    {
      page: 10,
      title: "Non-Uniform Motion",
      content: `Non-Uniform Motion:
An object is said to be in non-uniform motion if it covers unequal distances in equal intervals of time.

Characteristics:
• Variable velocity
• Non-zero acceleration
• Unequal displacement in equal time intervals
• Speed and/or direction changes

Examples:
• A car in city traffic
• Motion of a freely falling body
• A ball thrown upward

Types of Non-Uniform Motion:

1. Uniformly Accelerated Motion:
   - Acceleration is constant
   - Example: Free fall, motion on inclined plane

2. Non-Uniformly Accelerated Motion:
   - Acceleration is variable
   - Example: Motion in city traffic

Position-Time Graph for Non-Uniform Motion:
- Curved line (not straight)
- Slope varies at different points
- Instantaneous velocity = slope of tangent at that point

Velocity-Time Graph for Uniformly Accelerated Motion:
- Straight line (not horizontal)
- Slope = constant acceleration
- Area under line = displacement

Average Velocity = Total displacement/Total time`,
    },
    {
      page: 11,
      title: "Solved Examples - Part 1",
      content: `Example 1: Speed and Velocity
Problem: A car travels 100 km north in 2 hours, then 60 km south in 1 hour. Calculate:
(a) Total distance  (b) Total displacement  (c) Average speed  (d) Average velocity

Solution:
(a) Total distance = 100 + 60 = 160 km

(b) Taking north as positive direction:
    Final displacement = 100 - 60 = 40 km north
    Total displacement = 40 km north

(c) Total time = 2 + 1 = 3 hours
    Average speed = Total distance/Total time = 160/3 = 53.33 km/h

(d) Average velocity = Total displacement/Total time = 40/3 = 13.33 km/h north

Example 2: Acceleration
Problem: A car accelerates from 20 m/s to 50 m/s in 10 seconds. Calculate acceleration.

Solution:
Given: u = 20 m/s, v = 50 m/s, t = 10 s

Using: a = (v - u)/t
a = (50 - 20)/10 = 30/10 = 3 m/s²

Answer: Acceleration = 3 m/s²`,
    },
    {
      page: 12,
      title: "Solved Examples - Part 2",
      content: `Example 3: Equations of Motion
Problem: A train starting from rest accelerates at 2 m/s² for 10 seconds. Find:
(a) Final velocity  (b) Distance covered

Solution:
Given: u = 0 (starts from rest), a = 2 m/s², t = 10 s

(a) Using v = u + at
    v = 0 + 2(10) = 20 m/s

(b) Using s = ut + ½at²
    s = 0(10) + ½(2)(10)²
    s = 0 + ½(2)(100) = 100 m

Answer: (a) Final velocity = 20 m/s  (b) Distance = 100 m

Example 4: Third Equation of Motion
Problem: A car moving at 30 m/s brakes to stop in 50 m. Find acceleration.

Solution:
Given: u = 30 m/s, v = 0 (stops), s = 50 m

Using v² = u² + 2as
0² = 30² + 2a(50)
0 = 900 + 100a
100a = -900
a = -9 m/s²

Answer: Acceleration = -9 m/s² (negative indicates deceleration)`,
    },
    {
      page: 13,
      title: "Practice Problems",
      content: `Practice Set A: Basic Concepts

1. A cyclist covers 15 km in 30 minutes. Calculate his speed in:
   (a) km/h    (b) m/s

2. A car travels 240 km in 4 hours. What is its speed?

3. Convert the following:
   (a) 72 km/h to m/s    (b) 25 m/s to km/h

4. An athlete runs 400 m race in 50 seconds. Calculate his average speed.

Practice Set B: Distance and Displacement

5. A person walks 3 km east, then 4 km north. Find:
   (a) Total distance    (b) Displacement

6. A car moves 50 km north, then 30 km south, then 20 km north. Calculate:
   (a) Total distance covered
   (b) Final displacement from starting point

Practice Set C: Acceleration

7. A bus increases its speed from 36 km/h to 72 km/h in 10 seconds. Calculate acceleration.

8. A train slows down from 60 m/s to 20 m/s in 8 seconds. Find retardation.

9. A car starts from rest and reaches a speed of 45 km/h in 15 seconds. Calculate acceleration in m/s².`,
    },
    {
      page: 14,
      title: "Practice Problems - Equations of Motion",
      content: `Practice Set D: Equations of Motion

10. A stone is dropped from a height. After 3 seconds, find:
    (a) Its velocity    (b) Distance fallen
    (Take g = 10 m/s²)

11. A car accelerates uniformly from 5 m/s to 25 m/s in 4 seconds. Calculate:
    (a) Acceleration    (b) Distance covered

12. A ball is thrown upward with velocity 20 m/s. Find:
    (a) Maximum height reached
    (b) Time to reach maximum height
    (Take g = 10 m/s²)

13. A train moving at 72 km/h applies brakes and stops in 200 m. Calculate:
    (a) Retardation    (b) Time taken to stop

14. An object starts with velocity 2 m/s and accelerates at 3 m/s² for 4 seconds. Find:
    (a) Final velocity    (b) Distance covered

15. A car travels first 100 m in 10 s and next 100 m in 15 s. Calculate:
    (a) Average speed for first 100 m
    (b) Average speed for next 100 m  
    (c) Average speed for entire journey

Challenging Problems:

16. Two trains start from the same station simultaneously. Train A moves at 60 km/h and Train B at 80 km/h. After how much time will they be 50 km apart?

17. A ball is dropped from rest. Another ball is thrown downward 1 second later with speed 10 m/s. When will the second ball overtake the first?`,
    },
    {
      page: 15,
      title: "Key Formulas and Summary",
      content: `KEY FORMULAS:

Basic Definitions:
• Speed = Distance/Time
• Velocity = Displacement/Time  
• Acceleration = Change in velocity/Time = (v-u)/t

Equations of Motion (for uniform acceleration):
• v = u + at
• s = ut + ½at²
• v² = u² + 2as

Average Values:
• Average speed = Total distance/Total time
• Average velocity = Total displacement/Total time

Unit Conversions:
• 1 km/h = 5/18 m/s
• 1 m/s = 18/5 km/h

CHAPTER SUMMARY:

✓ Motion is relative and depends on frame of reference
✓ Distance is scalar, displacement is vector
✓ Speed is scalar, velocity is vector  
✓ Acceleration can be positive, negative, or zero
✓ Equations of motion apply to uniform acceleration only
✓ Graphs help visualize motion patterns
✓ Uniform motion: constant velocity, zero acceleration
✓ Non-uniform motion: variable velocity, non-zero acceleration

IMPORTANT POINTS TO REMEMBER:

• An object can be at rest in one frame and in motion in another
• Distance ≥ |Displacement|
• For motion in straight line: Distance = |Displacement| only if no change in direction
• Zero acceleration means constant velocity (not necessarily zero velocity)
• Area under v-t graph gives displacement
• Slope of s-t graph gives velocity
• Slope of v-t graph gives acceleration`,
    },
  ],
};
