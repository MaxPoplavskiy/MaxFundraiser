export enum FundraiserStatusFilterValue {
  ALL = "ALL",
  PENDING = "0",
  APPROVED = "1",
  DECLINED = "2",
  FINISHED = "3",
}

export enum FundraiserStatusValue {
  PENDING,
  APPROVED,
  DECLINED,
  FINISHED,
}

export const FundraiserStatusValueToString: Record<number, string> = {
  0: "PENDING",
  1: "APPROVED",
  2: "DECLINED",
  3: "FINISHED",
}

export const FundraiserStatusFilterOption = {
  ALL: {
    value: FundraiserStatusFilterValue.ALL,
    label: FundraiserStatusFilterValue.ALL,
  },
  PENDING: {
    value: FundraiserStatusFilterValue.PENDING,
    label: "PENDING",
  },
  APPROVED: {
    value: FundraiserStatusFilterValue.APPROVED,
    label: "APPROVED",
  },
  DECLINED: {
    value: FundraiserStatusFilterValue.DECLINED,
    label: "DECLINED",
  },
  FINISHED: {
    value: FundraiserStatusFilterValue.FINISHED,
    label: "FINISHED",
  },
};

export type FundraiserStatusFilter = typeof FundraiserStatusFilterOption;
