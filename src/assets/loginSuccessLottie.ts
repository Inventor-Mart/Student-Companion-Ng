// Custom 1.5s (45 frames @ 30fps) Lottie checkmark animation matching Deep Navy, Lime Green (#84E000), and Electric Orange (#FF5B00)
export const LOGIN_SUCCESS_LOTTIE_DATA = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 45,
  w: 300,
  h: 300,
  nm: 'Login Success Checkmark',
  ddd: 0,
  assets: [],
  layers: [
    // Layer 1: Outer Electric Orange pulse ring
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Orange Pulse Ring',
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 10, s: [90] },
            { t: 38, s: [35] },
            { t: 45, s: [0] }
          ]
        },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 45, s: [120] }
          ]
        },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [65, 65, 100] },
            { t: 22, s: [110, 110, 100] },
            { t: 45, s: [122, 122, 100] }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              d: 1,
              ty: 'el',
              s: { a: 0, k: [215, 215] },
              p: { a: 0, k: [0, 0] }
            },
            {
              ty: 'st',
              c: { a: 0, k: [1, 0.357, 0, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 6 },
              lc: 2,
              lj: 2,
              d: [
                { n: 'd', nm: 'dash', v: { a: 0, k: 24 } },
                { n: 'g', nm: 'gap', v: { a: 0, k: 18 } }
              ]
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        }
      ],
      ip: 0,
      op: 45,
      st: 0
    },
    // Layer 2: Inner Deep Navy Backing + Lime Green Rim Ring (trim path 0 -> 100%)
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'Lime Ring Circle',
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0] },
            { t: 6, s: [100] }
          ]
        },
        r: { a: 0, k: -90 },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [72, 72, 100] },
            { t: 18, s: [106, 106, 100] },
            { t: 28, s: [100, 100, 100] }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              d: 1,
              ty: 'el',
              s: { a: 0, k: [164, 164] },
              p: { a: 0, k: [0, 0] }
            },
            {
              ty: 'fl',
              c: { a: 0, k: [0.059, 0.114, 0.239, 1] },
              o: { a: 0, k: 95 }
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.518, 0.878, 0, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 10 },
              lc: 2,
              lj: 2
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        },
        {
          ty: 'tm',
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: [
              { t: 0, s: [0] },
              { t: 18, s: [100] }
            ]
          },
          o: { a: 0, k: 0 },
          m: 1,
          nm: 'Trim Path'
        }
      ],
      ip: 0,
      op: 45,
      st: 0
    },
    // Layer 3: Animated Crisp Lime Green Checkmark Stroke
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: 'Checkmark Stroke',
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 8, s: [0] },
            { t: 12, s: [100] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 10, s: [85, 85, 100] },
            { t: 24, s: [108, 108, 100] },
            { t: 32, s: [100, 100, 100] }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ind: 0,
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  i: [
                    [0, 0],
                    [0, 0],
                    [0, 0]
                  ],
                  o: [
                    [0, 0],
                    [0, 0],
                    [0, 0]
                  ],
                  v: [
                    [-36, 3],
                    [-10, 29],
                    [40, -25]
                  ],
                  c: false
                }
              }
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.588, 0.969, 0.086, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 14 },
              lc: 2,
              lj: 2
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 }
            }
          ]
        },
        {
          ty: 'tm',
          s: { a: 0, k: 0 },
          e: {
            a: 1,
            k: [
              { t: 10, s: [0] },
              { t: 26, s: [100] }
            ]
          },
          o: { a: 0, k: 0 },
          m: 1,
          nm: 'Checkmark Trim'
        }
      ],
      ip: 0,
      op: 45,
      st: 0
    }
  ]
};
