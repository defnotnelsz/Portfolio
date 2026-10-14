export type Difficulty = 'easy' | 'medium' | 'hard';
export type Duration = 15 | 30 | 60 | 180;

export interface DurationOption {
  value: Duration;
  label: string;
}

export const DURATION_OPTIONS: DurationOption[] = [
  { value: 15, label: '15 SEC' },
  { value: 30, label: '30 SEC' },
  { value: 60, label: '1 MIN' },
  { value: 180, label: '3 MIN' },
];

export const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; description: string }[] = [
  { 
    value: 'easy', 
    label: 'EASY',
    description: 'Simple, everyday sentences with common words and basic punctuation.'
  },
  { 
    value: 'medium', 
    label: 'MEDIUM',
    description: 'Longer sentences with varied vocabulary and moderately complex wording.'
  },
  { 
    value: 'hard', 
    label: 'HARD',
    description: 'Challenging passages involving technical vocabulary, programming concepts, and symbols.'
  },
];

export const BENCHMARKS: Record<Difficulty, Record<Duration, number>> = {
  easy: {
    15: 50,
    30: 105,
    60: 80,
    180: 85,
  },
  medium: {
    15: 65,
    30: 76,
    60: 71,
    180: 76,
  },
  hard: {
    15: 55,
    30: 50,
    60: 49,
    180: 53,
  },
};

export function getBenchmark(difficulty: Difficulty, duration: Duration): number {
  return BENCHMARKS[difficulty]?.[duration] ?? 76;
}


export const PASSAGES: Record<Difficulty, string[]> = {
  easy: [
    "The sun rises early in the morning and brings a warm glow to the quiet streets. Birds sing in the tall green trees while people enjoy a fresh cup of tea. It is a peaceful way to begin a brand new day.",
    "Reading a good book before bed is one of the best ways to relax. You can travel to new worlds, meet fun characters, and learn interesting ideas without ever having to leave your room.",
    "Cooking a simple meal at home brings joy to the whole family. Fresh bread, sweet fruit, and warm soup make everyone feel happy and satisfied after a long day of work and study.",
    "Walking along the sandy beach in the evening helps clear your mind. The sound of gentle waves and the cool sea breeze make it easy to forget your worries and enjoy the present moment.",
    "Practice makes progress in everything you choose to do. When you spend a few minutes every single day working on a skill, you will be surprised by how much better you become over time.",
    "A friendly smile can brighten someone's day when they least expect it. Kind words cost nothing to give, but they can mean the world to a friend or neighbor who needs a little cheer.",
    "Taking care of small green plants is a fun and rewarding hobby. All they need is clean water, bright sunshine, and a little bit of patience to grow into healthy flowers.",
    "Riding a bicycle through the city park is a wonderful way to stay active. You can feel the fresh air on your face, wave to your neighbors, and enjoy the beauty of the outdoors.",
    "Listening to your favorite song can lift your mood in an instant. Music has a special way of bringing back happy memories and making ordinary moments feel exciting and full of life.",
    "Writing down your thoughts in a small notebook helps keep your ideas organized. When you look back at old pages, you can see how much you have learned and grown along the way.",
    "Spending time with good friends makes life much more colorful. Sharing funny stories, playing games, and laughing together are the simple things that make every weekend special.",
    "A warm cup of coffee on a rainy afternoon is one of life's simple pleasures. Watching raindrops fall against the window glass brings a sense of calm and comfort to the home.",
    "Learning to play a musical instrument takes time and focus. Even if you only play a few simple notes at first, making music with your own hands is always deeply satisfying.",
    "Traveling to a nearby town or village allows you to discover new sights. Trying local snacks, visiting market stalls, and walking around historical streets makes for a great trip.",
    "Getting enough sleep each night gives your body and mind the energy they need. When you wake up well rested, you feel ready to take on whatever challenges the day may bring.",
  ],
  medium: [
    "Design is not merely about aesthetic ornamentation or surface styling; it fundamentally reflects how an interface behaves under real-world usage. When an application anticipates user needs and responds with fluid precision, technology recedes into the background.",
    "Effective software engineering demands a delicate balance between rapid prototyping and long-term architectural stability. While quick iteration proves valuable during initial discovery, disciplined refactoring ensures that complex codebases remain maintainable over decades.",
    "The transition from university coursework to professional engineering often reveals a stark contrast in priorities. Academic assignments reward algorithmic cleverness, whereas production systems prioritize readability, observability, and robust automated test suites.",
    "Continuous learning is the cornerstone of sustainable professional development in modern technology. Frameworks evolve, paradigms shift, and tools mature, but the underlying fundamentals of problem decomposition and algorithmic thinking remain timeless.",
    "Clear documentation serves as a lasting kindness to both your teammates and your future self. When complex architectural decisions are explained with contextual rationale, future contributors can modify systems with confidence rather than trepidation.",
    "User experience is ultimately determined by the accumulation of micro-interactions across an interface. A thoughtful keyboard shortcut, an instantaneous response state, and a well-timed layout animation together transform a functional tool into a memorable experience.",
    "Building resilient distributed platforms requires engineers to embrace failure as an inevitable operational reality. Network partitions, ephemeral latency spikes, and unexpected data anomalies must all be accounted for through defensive programming patterns.",
    "The craft of technical writing closely mirrors the craft of clean code. Both disciplines seek to eliminate ambiguity, minimize cognitive friction, and communicate nuanced ideas with clarity, economy of expression, and structural elegance.",
    "True collaboration thrives when engineers cultivate empathetic communication alongside technical rigor. Constructive code reviews, blameless post-incident retrospectives, and shared ownership of outcomes create an environment where teams consistently excel.",
    "Balancing simplicity with extensibility represents one of the most enduring challenges in software design. Premature abstractions often introduce unnecessary indirection, whereas thoughtful composition preserves flexibility without sacrificing straightforward comprehension.",
    "Accessibility is not an optional enhancement to be deferred until the final release; it is an essential attribute of inclusive engineering. Building interfaces that accommodate diverse physical and cognitive abilities elevates the quality of software for everyone.",
    "The emergence of modern web standards has elevated the browser into a universal runtime environment. From high-performance graphics rendering to real-time audio synthesis, the capabilities of contemporary client platforms continue to expand at a breathtaking pace.",
    "Great digital products are forged at the intersection of rigorous analytical discipline and creative intuition. Quantitative analytics may reveal what users do, but qualitative empathy and thoughtful observation uncover why they do it.",
    "Refactoring legacy code requires equal measures of patience, courage, and methodological discipline. By establishing comprehensive regression test suites first, engineers can safely decouple tangled dependencies and breathe new vitality into aging systems.",
    "Curiosity and intellectual humility are among the most reliable indicators of enduring engineering mastery. Those who remain eager to ask fundamental questions and listen attentively invariably solve the deepest architectural puzzles.",
  ],
  hard: [
    "In distributed consensus protocols like Raft and Paxos, maintaining state-machine consistency across partitioned quorum nodes necessitates strict monotonic term increments, append-entries heartbeats, and leader election timeouts (e.g., electionTimeout >= 150ms).",
    "When optimizing V8 JavaScript runtime performance, avoid polymorphic inline caches (`IC_MISS`) by preserving consistent object shapes; hidden classes ($shape) enable TurboFan to emit vectorized CPU instructions rather than dynamic dictionary lookups.",
    "A typical zero-copy I/O pipeline in Linux utilizes epoll_wait(2), splice(2), and sendfile(2) system calls, mitigating context-switch overhead across kernelspace/userspace memory boundaries while handling 100k+ concurrent TCP socket connections.",
    "PostgreSQL concurrency control relies on Multi-Version Concurrency Control (MVCC): rows include `xmin` and `xmax` transaction identifiers, requiring periodic VACUUM runs to reclaim dead tuples and prevent 32-bit transaction wraparound catastrophic data corruption.",
    "In TypeScript's advanced type system, conditional types combined with template literal types enable exhaustive pattern matching: `type RouteParams<T extends string> = T extends `${infer _}:${infer Param}/${infer Rest}` ? { [K in Param]: string } & RouteParams<Rest> : {};`",
    "Modern graphics pipelines implement deferred physically-based rendering (PBR) by populating G-buffers with diffuse albedo, normals [x, y, z], roughness, and metallic coefficients, subsequently executing screen-space ambient occlusion (SSAO) passes in compute shaders.",
    "Asynchronous event loops (e.g., libuv in Node.js) coordinate non-blocking I/O queues via microtask checkpoints: `process.nextTick()` and resolved `Promise.then()` callbacks preempt the macrotask queue (setImmediate, setTimeout) before polling active file descriptors.",
    "To eliminate memory-leak vulnerabilities in Rust, the borrow checker enforces affine type semantics: every value has a unique owner `T`, shared references `&T` are strictly read-only, and mutable references `&mut T` prohibit aliasing across concurrent execution threads.",
    "Graph traversal algorithms like Dijkstra's and A* evaluate cost functions `f(n) = g(n) + h(n)` using min-heap priority queues; admissible heuristics guarantee optimality while pruning combinatorial state spaces in O(|E| + |V| log |V|) time complexity.",
    "In Kubernetes cluster orchestration, etcd clusters preserve Raft log linearizability; mutating admission webhooks intercept serializable JSON payloads via `/validate` endpoints before the kube-apiserver persists CRD schemas to the underlying distributed key-value store.",
    "Cryptographic primitives like Ed25519 elliptic-curve digital signatures utilize Edwards-curve arithmetic over Galois field GF(2^255 - 19), guaranteeing constant-time execution resistant to cache-timing side-channel attacks (RFC 8032).",
    "Browser rendering engines (Blink/Gecko) parse HTML tokens incrementally, constructing DOM and CSSOM trees before executing recalculate-style routines: layout recalculations (reflow) trigger expensive composite-layer paint invalidations if `will-change: transform` is omitted.",
    "Real-time WebRTC media pipelines negotiate SDP session descriptions via ICE candidates (STUN/TURN), encapsulating Opus audio and VP9/AV1 video frames within SRTP packets with adaptive jitter buffer management and RTCP packet-loss feedback.",
    "In microservice architectures, distributed tracing implementations propagate W3C TraceContext headers (`traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`) across reverse proxies to correlate spans and quantify end-to-end P99 latency bottlenecks.",
    "Database indexing with B+ Trees guarantees logarithmic search depth O(log_B N); leaf nodes maintain doubly-linked sibling pointers for sequential range scans, while write-ahead logging (WAL) guarantees ACID durability via `fsync()` disk barriers.",
  ],
};

export function getRandomPassage(difficulty: Difficulty, lastPassage?: string): string {
  const list = PASSAGES[difficulty];
  if (!list || list.length === 0) return '';
  if (list.length === 1) return list[0];

  let next = list[Math.floor(Math.random() * list.length)];
  let attempts = 0;
  while (next === lastPassage && attempts < 10) {
    next = list[Math.floor(Math.random() * list.length)];
    attempts++;
  }
  return next;
}
