import { Mode, NUMERIC_MODE, ALPHANUMERIC_MODE, BYTE_MODE, KANJI_MODE, ERROR_CORRECTION_H, ERROR_CORRECTION_L, ERROR_CORRECTION_M, ERROR_CORRECTION_Q, ErrorCorrection, MaskPatternCallback, Mask } from './types'

export const FIRST_VERSION = 1
export const LAST_VERSION = 40
export const VERSIONS_AMOUNT = 40

export const CONTENT_TABLE_PER_VERSION = [
  {
    version: 0,
    L: {
      dataCodewordsAmount: 0,
      errorCorrectionPerBlock: 0,
      groupsAmount: 0,
      groupContent: [
        {
          blocks: 0,
          dataCodewordsPerBlock: 0
        }
      ]
    },
    M: {
      dataCodewordsAmount: 0,
      errorCorrectionPerBlock: 0,
      groupsAmount: 0,
      groupContent: [
        {
          blocks: 0,
          dataCodewordsPerBlock: 0
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 0,
      errorCorrectionPerBlock: 0,
      groupsAmount: 0,
      groupContent: [
        {
          blocks: 0,
          dataCodewordsPerBlock: 0
        }
      ]
    },
    H: {
      dataCodewordsAmount: 0,
      errorCorrectionPerBlock: 0,
      groupsAmount: 0,
      groupContent: [
        {
          blocks: 0,
          dataCodewordsPerBlock: 0
        }
      ]
    }
  },
  {
    version: 1,
    L: {
      dataCodewordsAmount: 19,
      errorCorrectionPerBlock: 7,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 19
        }
      ]
    },
    M: {
      dataCodewordsAmount: 16,
      errorCorrectionPerBlock: 10,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 16
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 13,
      errorCorrectionPerBlock: 13,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 13
        }
      ]
    },
    H: {
      dataCodewordsAmount: 9,
      errorCorrectionPerBlock: 17,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 9
        }
      ]
    }
  },
  {
    version: 2,
    L: {
      dataCodewordsAmount: 34,
      errorCorrectionPerBlock: 10,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 34
        }
      ]
    },
    M: {
      dataCodewordsAmount: 28,
      errorCorrectionPerBlock: 16,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 28
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 22,
      errorCorrectionPerBlock: 22,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 22
        }
      ]
    },
    H: {
      dataCodewordsAmount: 16,
      errorCorrectionPerBlock: 28,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 3,
    L: {
      dataCodewordsAmount: 55,
      errorCorrectionPerBlock: 15,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 55
        }
      ]
    },
    M: {
      dataCodewordsAmount: 44,
      errorCorrectionPerBlock: 26,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 44
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 34,
      errorCorrectionPerBlock: 18,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 17
        }
      ]
    },
    H: {
      dataCodewordsAmount: 26,
      errorCorrectionPerBlock: 22,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 13
        }
      ]
    }
  },
  {
    version: 4,
    L: {
      dataCodewordsAmount: 80,
      errorCorrectionPerBlock: 20,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 80
        }
      ]
    },
    M: {
      dataCodewordsAmount: 64,
      errorCorrectionPerBlock: 18,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 32
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 48,
      errorCorrectionPerBlock: 26,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 24
        }
      ]
    },
    H: {
      dataCodewordsAmount: 36,
      errorCorrectionPerBlock: 16,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 9
        }
      ]
    }
  },
  {
    version: 5,
    L: {
      dataCodewordsAmount: 108,
      errorCorrectionPerBlock: 26,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 108
        }
      ]
    },
    M: {
      dataCodewordsAmount: 86,
      errorCorrectionPerBlock: 24,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 43
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 62,
      errorCorrectionPerBlock: 18,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 16
        }
      ]
    },
    H: {
      dataCodewordsAmount: 46,
      errorCorrectionPerBlock: 22,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 11
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 12
        }
      ]
    }
  },
  {
    version: 6,
    L: {
      dataCodewordsAmount: 136,
      errorCorrectionPerBlock: 18,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 68
        }
      ]
    },
    M: {
      dataCodewordsAmount: 108,
      errorCorrectionPerBlock: 16,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 27
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 76,
      errorCorrectionPerBlock: 24,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 19
        }
      ]
    },
    H: {
      dataCodewordsAmount: 60,
      errorCorrectionPerBlock: 28,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 15
        }
      ]
    }
  },
  {
    version: 7,
    L: {
      dataCodewordsAmount: 156,
      errorCorrectionPerBlock: 20,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 78
        }
      ]
    },
    M: {
      dataCodewordsAmount: 124,
      errorCorrectionPerBlock: 18,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 31
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 88,
      errorCorrectionPerBlock: 18,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 14
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 15
        }
      ]
    },
    H: {
      dataCodewordsAmount: 66,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 13
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 14
        }
      ]
    }
  },
  {
    version: 8,
    L: {
      dataCodewordsAmount: 194,
      errorCorrectionPerBlock: 24,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 97
        }
      ]
    },
    M: {
      dataCodewordsAmount: 154,
      errorCorrectionPerBlock: 22,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 38
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 39
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 110,
      errorCorrectionPerBlock: 22,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 18
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 19
        }
      ]
    },
    H: {
      dataCodewordsAmount: 86,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 14
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 15
        }
      ]
    }
  },
  {
    version: 9,
    L: {
      dataCodewordsAmount: 232,
      errorCorrectionPerBlock: 30,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 116
        }
      ]
    },
    M: {
      dataCodewordsAmount: 182,
      errorCorrectionPerBlock: 22,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 36
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 37
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 132,
      errorCorrectionPerBlock: 20,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 16
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 17
        }
      ]
    },
    H: {
      dataCodewordsAmount: 100,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 12
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 13
        }
      ]
    }
  },
  {
    version: 10,
    L: {
      dataCodewordsAmount: 274,
      errorCorrectionPerBlock: 18,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 68
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 69
        }
      ]
    },
    M: {
      dataCodewordsAmount: 216,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 43
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 44
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 154,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 6,
          dataCodewordsPerBlock: 19
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 20
        }
      ]
    },
    H: {
      dataCodewordsAmount: 122,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 6,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 11,
    L: {
      dataCodewordsAmount: 324,
      errorCorrectionPerBlock: 20,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 81
        }
      ]
    },
    M: {
      dataCodewordsAmount: 254,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 50
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 51
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 180,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 22
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 23
        }
      ]
    },
    H: {
      dataCodewordsAmount: 140,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 12
        },
        {
          blocks: 8,
          dataCodewordsPerBlock: 13
        }
      ]
    }
  },
  {
    version: 12,
    L: {
      dataCodewordsAmount: 370,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 92
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 93
        }
      ]
    },
    M: {
      dataCodewordsAmount: 290,
      errorCorrectionPerBlock: 22,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 6,
          dataCodewordsPerBlock: 36
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 37
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 206,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 20
        },
        {
          blocks: 6,
          dataCodewordsPerBlock: 21
        }
      ]
    },
    H: {
      dataCodewordsAmount: 158,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 7,
          dataCodewordsPerBlock: 14
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 15
        }
      ]
    }
  },
  {
    version: 13,
    L: {
      dataCodewordsAmount: 428,
      errorCorrectionPerBlock: 26,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 107
        }
      ]
    },
    M: {
      dataCodewordsAmount: 334,
      errorCorrectionPerBlock: 22,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 8,
          dataCodewordsPerBlock: 37
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 38
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 244,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 8,
          dataCodewordsPerBlock: 20
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 21
        }
      ]
    },
    H: {
      dataCodewordsAmount: 180,
      errorCorrectionPerBlock: 22,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 12,
          dataCodewordsPerBlock: 11
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 12
        }
      ]
    }
  },
  {
    version: 14,
    L: {
      dataCodewordsAmount: 461,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 115
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 116
        }
      ]
    },
    M: {
      dataCodewordsAmount: 365,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 40
        },
        {
          blocks: 5,
          dataCodewordsPerBlock: 41
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 261,
      errorCorrectionPerBlock: 20,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 11,
          dataCodewordsPerBlock: 16
        },
        {
          blocks: 5,
          dataCodewordsPerBlock: 17
        }
      ]
    },
    H: {
      dataCodewordsAmount: 197,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 11,
          dataCodewordsPerBlock: 12
        },
        {
          blocks: 5,
          dataCodewordsPerBlock: 13
        }
      ]
    }
  },
  {
    version: 15,
    L: {
      dataCodewordsAmount: 523,
      errorCorrectionPerBlock: 22,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 5,
          dataCodewordsPerBlock: 87
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 88
        }
      ]
    },
    M: {
      dataCodewordsAmount: 415,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 5,
          dataCodewordsPerBlock: 41
        },
        {
          blocks: 5,
          dataCodewordsPerBlock: 42
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 295,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 5,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 7,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 223,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 11,
          dataCodewordsPerBlock: 12
        },
        {
          blocks: 7,
          dataCodewordsPerBlock: 13
        }
      ]
    }
  },
  {
    version: 16,
    L: {
      dataCodewordsAmount: 589,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 5,
          dataCodewordsPerBlock: 98
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 99
        }
      ]
    },
    M: {
      dataCodewordsAmount: 453,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 7,
          dataCodewordsPerBlock: 45
        },
        {
          blocks: 3,
          dataCodewordsPerBlock: 46
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 325,
      errorCorrectionPerBlock: 24,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 15,
          dataCodewordsPerBlock: 19
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 20
        }
      ]
    },
    H: {
      dataCodewordsAmount: 253,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 13,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 17,
    L: {
      dataCodewordsAmount: 647,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 107
        },
        {
          blocks: 5,
          dataCodewordsPerBlock: 108
        }
      ]
    },
    M: {
      dataCodewordsAmount: 507,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 10,
          dataCodewordsPerBlock: 46
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 47
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 367,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 22
        },
        {
          blocks: 15,
          dataCodewordsPerBlock: 23
        }
      ]
    },
    H: {
      dataCodewordsAmount: 283,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 14
        },
        {
          blocks: 17,
          dataCodewordsPerBlock: 15
        }
      ]
    }
  },
  {
    version: 18,
    L: {
      dataCodewordsAmount: 721,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 5,
          dataCodewordsPerBlock: 120
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 121
        }
      ]
    },
    M: {
      dataCodewordsAmount: 563,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 9,
          dataCodewordsPerBlock: 43
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 44
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 397,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 17,
          dataCodewordsPerBlock: 22
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 23
        }
      ]
    },
    H: {
      dataCodewordsAmount: 313,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 14
        },
        {
          blocks: 19,
          dataCodewordsPerBlock: 15
        }
      ]
    }
  },
  {
    version: 19,
    L: {
      dataCodewordsAmount: 795,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 113
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 114
        }
      ]
    },
    M: {
      dataCodewordsAmount: 627,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 44
        },
        {
          blocks: 11,
          dataCodewordsPerBlock: 45
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 445,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 17,
          dataCodewordsPerBlock: 21
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 22
        }
      ]
    },
    H: {
      dataCodewordsAmount: 341,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 9,
          dataCodewordsPerBlock: 13
        },
        {
          blocks: 16,
          dataCodewordsPerBlock: 14
        }
      ]
    }
  },
  {
    version: 20,
    L: {
      dataCodewordsAmount: 861,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 107
        },
        {
          blocks: 5,
          dataCodewordsPerBlock: 108
        }
      ]
    },
    M: {
      dataCodewordsAmount: 669,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 41
        },
        {
          blocks: 13,
          dataCodewordsPerBlock: 42
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 485,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 15,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 5,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 385,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 15,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 10,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 21,
    L: {
      dataCodewordsAmount: 932,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 116
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 117
        }
      ]
    },
    M: {
      dataCodewordsAmount: 714,
      errorCorrectionPerBlock: 26,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 17,
          dataCodewordsPerBlock: 42
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 512,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 17,
          dataCodewordsPerBlock: 22
        },
        {
          blocks: 6,
          dataCodewordsPerBlock: 23
        }
      ]
    },
    H: {
      dataCodewordsAmount: 406,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 19,
          dataCodewordsPerBlock: 16
        },
        {
          blocks: 6,
          dataCodewordsPerBlock: 17
        }
      ]
    }
  },
  {
    version: 22,
    L: {
      dataCodewordsAmount: 1006,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 111
        },
        {
          blocks: 7,
          dataCodewordsPerBlock: 112
        }
      ]
    },
    M: {
      dataCodewordsAmount: 782,
      errorCorrectionPerBlock: 28,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 17,
          dataCodewordsPerBlock: 46
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 568,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 7,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 16,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 442,
      errorCorrectionPerBlock: 24,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 34,
          dataCodewordsPerBlock: 13
        }
      ]
    }
  },
  {
    version: 23,
    L: {
      dataCodewordsAmount: 1094,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 121
        },
        {
          blocks: 5,
          dataCodewordsPerBlock: 122
        }
      ]
    },
    M: {
      dataCodewordsAmount: 860,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 47
        },
        {
          blocks: 14,
          dataCodewordsPerBlock: 48
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 614,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 11,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 14,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 464,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 16,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 14,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 24,
    L: {
      dataCodewordsAmount: 1174,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 6,
          dataCodewordsPerBlock: 117
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 118
        }
      ]
    },
    M: {
      dataCodewordsAmount: 914,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 6,
          dataCodewordsPerBlock: 45
        },
        {
          blocks: 14,
          dataCodewordsPerBlock: 46
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 664,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 11,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 16,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 514,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 30,
          dataCodewordsPerBlock: 16
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 17
        }
      ]
    }
  },
  {
    version: 25,
    L: {
      dataCodewordsAmount: 1276,
      errorCorrectionPerBlock: 26,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 8,
          dataCodewordsPerBlock: 106
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 107
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1000,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 8,
          dataCodewordsPerBlock: 47
        },
        {
          blocks: 13,
          dataCodewordsPerBlock: 48
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 718,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 7,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 22,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 538,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 22,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 13,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 26,
    L: {
      dataCodewordsAmount: 1370,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 10,
          dataCodewordsPerBlock: 114
        },
        {
          blocks: 2,
          dataCodewordsPerBlock: 115
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1062,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 19,
          dataCodewordsPerBlock: 46
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 47
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 754,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 28,
          dataCodewordsPerBlock: 22
        },
        {
          blocks: 6,
          dataCodewordsPerBlock: 23
        }
      ]
    },
    H: {
      dataCodewordsAmount: 596,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 33,
          dataCodewordsPerBlock: 16
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 17
        }
      ]
    }
  },
  {
    version: 27,
    L: {
      dataCodewordsAmount: 1468,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 8,
          dataCodewordsPerBlock: 122
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 123
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1128,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 22,
          dataCodewordsPerBlock: 45
        },
        {
          blocks: 3,
          dataCodewordsPerBlock: 46
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 808,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 8,
          dataCodewordsPerBlock: 23
        },
        {
          blocks: 26,
          dataCodewordsPerBlock: 24
        }
      ]
    },
    H: {
      dataCodewordsAmount: 628,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 12,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 28,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 28,
    L: {
      dataCodewordsAmount: 1531,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 117
        },
        {
          blocks: 10,
          dataCodewordsPerBlock: 118
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1193,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 3,
          dataCodewordsPerBlock: 45
        },
        {
          blocks: 23,
          dataCodewordsPerBlock: 46
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 871,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 31,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 661,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 11,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 31,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 29,
    L: {
      dataCodewordsAmount: 1631,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 7,
          dataCodewordsPerBlock: 116
        },
        {
          blocks: 7,
          dataCodewordsPerBlock: 117
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1267,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 21,
          dataCodewordsPerBlock: 45
        },
        {
          blocks: 7,
          dataCodewordsPerBlock: 46
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 911,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 1,
          dataCodewordsPerBlock: 23
        },
        {
          blocks: 37,
          dataCodewordsPerBlock: 24
        }
      ]
    },
    H: {
      dataCodewordsAmount: 701,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 19,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 26,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 30,
    L: {
      dataCodewordsAmount: 1735,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 5,
          dataCodewordsPerBlock: 115
        },
        {
          blocks: 10,
          dataCodewordsPerBlock: 116
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1373,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 19,
          dataCodewordsPerBlock: 47
        },
        {
          blocks: 10,
          dataCodewordsPerBlock: 48
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 985,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 15,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 25,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 745,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 23,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 25,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 31,
    L: {
      dataCodewordsAmount: 1843,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 13,
          dataCodewordsPerBlock: 115
        },
        {
          blocks: 3,
          dataCodewordsPerBlock: 116
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1455,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 46
        },
        {
          blocks: 29,
          dataCodewordsPerBlock: 47
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1033,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 42,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 793,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 23,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 28,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 32,
    L: {
      dataCodewordsAmount: 1955,
      errorCorrectionPerBlock: 30,
      groupsAmount: 1,
      groupContent: [
        {
          blocks: 17,
          dataCodewordsPerBlock: 115
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1541,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 10,
          dataCodewordsPerBlock: 46
        },
        {
          blocks: 23,
          dataCodewordsPerBlock: 47
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1115,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 10,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 35,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 845,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 19,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 35,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 33,
    L: {
      dataCodewordsAmount: 2071,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 17,
          dataCodewordsPerBlock: 115
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 116
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1631,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 14,
          dataCodewordsPerBlock: 46
        },
        {
          blocks: 21,
          dataCodewordsPerBlock: 47
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1171,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 29,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 19,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 901,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 11,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 46,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 34,
    L: {
      dataCodewordsAmount: 2191,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 13,
          dataCodewordsPerBlock: 115
        },
        {
          blocks: 6,
          dataCodewordsPerBlock: 116
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1725,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 14,
          dataCodewordsPerBlock: 46
        },
        {
          blocks: 23,
          dataCodewordsPerBlock: 47
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1231,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 44,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 7,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 961,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 59,
          dataCodewordsPerBlock: 16
        },
        {
          blocks: 1,
          dataCodewordsPerBlock: 17
        }
      ]
    }
  },
  {
    version: 35,
    L: {
      dataCodewordsAmount: 2306,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 12,
          dataCodewordsPerBlock: 121
        },
        {
          blocks: 7,
          dataCodewordsPerBlock: 122
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1812,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 12,
          dataCodewordsPerBlock: 47
        },
        {
          blocks: 26,
          dataCodewordsPerBlock: 48
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1286,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 39,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 14,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 986,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 22,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 41,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 36,
    L: {
      dataCodewordsAmount: 2434,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 6,
          dataCodewordsPerBlock: 121
        },
        {
          blocks: 14,
          dataCodewordsPerBlock: 122
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1914,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 6,
          dataCodewordsPerBlock: 47
        },
        {
          blocks: 34,
          dataCodewordsPerBlock: 48
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1354,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 46,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 10,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 1054,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 2,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 64,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 37,
    L: {
      dataCodewordsAmount: 2566,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 17,
          dataCodewordsPerBlock: 122
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 123
        }
      ]
    },
    M: {
      dataCodewordsAmount: 1992,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 29,
          dataCodewordsPerBlock: 46
        },
        {
          blocks: 14,
          dataCodewordsPerBlock: 47
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1426,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 49,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 10,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 1096,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 24,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 46,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 38,
    L: {
      dataCodewordsAmount: 2702,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 4,
          dataCodewordsPerBlock: 122
        },
        {
          blocks: 18,
          dataCodewordsPerBlock: 123
        }
      ]
    },
    M: {
      dataCodewordsAmount: 2102,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 13,
          dataCodewordsPerBlock: 46
        },
        {
          blocks: 32,
          dataCodewordsPerBlock: 47
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1502,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 48,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 14,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 1142,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 42,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 32,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 39,
    L: {
      dataCodewordsAmount: 2812,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 20,
          dataCodewordsPerBlock: 117
        },
        {
          blocks: 4,
          dataCodewordsPerBlock: 118
        }
      ]
    },
    M: {
      dataCodewordsAmount: 2216,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 40,
          dataCodewordsPerBlock: 47
        },
        {
          blocks: 7,
          dataCodewordsPerBlock: 48
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1582,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 43,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 22,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 1222,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 10,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 67,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  },
  {
    version: 40,
    L: {
      dataCodewordsAmount: 2956,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 19,
          dataCodewordsPerBlock: 118
        },
        {
          blocks: 6,
          dataCodewordsPerBlock: 119
        }
      ]
    },
    M: {
      dataCodewordsAmount: 2334,
      errorCorrectionPerBlock: 28,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 18,
          dataCodewordsPerBlock: 47
        },
        {
          blocks: 31,
          dataCodewordsPerBlock: 48
        }
      ]
    },
    Q: {
      dataCodewordsAmount: 1666,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 34,
          dataCodewordsPerBlock: 24
        },
        {
          blocks: 34,
          dataCodewordsPerBlock: 25
        }
      ]
    },
    H: {
      dataCodewordsAmount: 1276,
      errorCorrectionPerBlock: 30,
      groupsAmount: 2,
      groupContent: [
        {
          blocks: 20,
          dataCodewordsPerBlock: 15
        },
        {
          blocks: 61,
          dataCodewordsPerBlock: 16
        }
      ]
    }
  }
]

export const MODE_NUMBER_REPRESENTATION: Record<Mode, number> = {
  [NUMERIC_MODE]: 1,
  [ALPHANUMERIC_MODE]: 2,
  [BYTE_MODE]: 4,
  [KANJI_MODE]: 8
} as Record<Mode, number>

export const BITS_FOR_MODE = 4

export const NUMERIC_MODE_REGEX = /^\d*$/;
export const ALPHANUMERIC_MODE_REGEX = /^[\dA-Z $%*+\-./:]*$/;
export const BYTE_MODE_REGEX = /^[\x00-\xff]*$/;
export const KANJI_MODE_REGEX = /^[\p{Script_Extensions=Han}\p{Script_Extensions=Hiragana}\p{Script_Extensions=Katakana}]*$/u;

export const MODE_LIST = [NUMERIC_MODE, ALPHANUMERIC_MODE, BYTE_MODE, KANJI_MODE]
export const MODE_REGEX_LIST = [NUMERIC_MODE_REGEX, ALPHANUMERIC_MODE_REGEX, BYTE_MODE_REGEX, KANJI_MODE_REGEX]

export const ERROR_CORRECTION_NUMBER_REPRESENTATION: Record<ErrorCorrection, number> = {
  [ERROR_CORRECTION_L]: 1,
  [ERROR_CORRECTION_M]: 0,
  [ERROR_CORRECTION_Q]: 3,
  [ERROR_CORRECTION_H]: 2
} as Record<ErrorCorrection, number>

export const ERROR_CORRECTION_ASCENDING_LIST: ErrorCorrection[] = [
  ERROR_CORRECTION_L, 
  ERROR_CORRECTION_M, 
  ERROR_CORRECTION_Q, 
  ERROR_CORRECTION_H
]

export const BITS_FOR_ERROR_CORRECTION_LEVEL = 2

export const DEFAULT_ERROR_CORRECTION = ERROR_CORRECTION_L

export const VERSION_SIZE_BASE = 21
export const VERSION_SIZE_INCREASE = 4

export const BITS_FOR_MESSAGE_LENGTH: Record<Mode, number[]> = {
  [NUMERIC_MODE]: [10, 12, 14], 
  [ALPHANUMERIC_MODE]: [9, 11, 13], 
  [BYTE_MODE]: [8, 16, 16],
  [KANJI_MODE]: [8, 10, 12]
} as Record<Mode, number[]>

export const VERSION_BOUNDARIES = [ 1, 10, 27 ]

export const BITS_FOR_TERMINATOR = 4

export const BITS_FOR_MASK = 3

export const MASK_PATTERN_CALLBACKS: Array<MaskPatternCallback> = [
  ({ x, y }) => (x + y) % 2 === 0,
  ({ y }) => y % 2 === 0,
  ({ x }) => x % 3 === 0,
  ({ x, y }) => (x + y) % 3 === 0,
  ({ x, y }) => (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0,
  ({ x, y }) => ((x * y) % 2) + ((x * y) % 3) === 0,
  ({ x, y }) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
  ({ x, y }) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
]

export const DEFAULT_MASK: Mask = 0
