/** 온통청년 `/go/ythip/getPlcy` 정책 1건 */
export interface YouthPolicy {
  addAplyQlfcCndCn: string;
  aplyPrdSeCd: string;
  aplyUrlAddr: string;
  aplyYmd: string;
  bizPrdBgngYmd: string;
  bizPrdEndYmd: string;
  bizPrdEtcCn: string;
  bizPrdSeCd: string;
  bscPlanAsmtNo: string;
  bscPlanCycl: string;
  bscPlanFcsAsmtNo: string;
  bscPlanPlcyWayNo: string;
  earnCndSeCd: string;
  earnEtcCn: string;
  earnMaxAmt: string;
  earnMinAmt: string;
  etcMttrCn: string;
  frstRegDt: string;
  inqCnt: string;
  jobCd: string;
  lastMdfcnDt: string;
  lclsfNm: string;
  mclsfNm: string;
  mrgSttsCd: string;
  operInstCd: string;
  operInstCdNm: string;
  operInstPicNm: string;
  plcyAplyMthdCn: string;
  plcyAprvSttsCd: string;
  plcyExplnCn: string;
  plcyKywdNm: string;
  plcyMajorCd: string;
  plcyNm: string;
  plcyNo: string;
  plcyPvsnMthdCd: string;
  plcySprtCn: string;
  ptcpPrpTrgtCn: string;
  pvsnInstGroupCd: string;
  refUrlAddr1: string;
  refUrlAddr2: string;
  rgtrHghrkInstCd: string;
  rgtrHghrkInstCdNm: string;
  rgtrInstCd: string;
  rgtrInstCdNm: string;
  rgtrUpInstCd: string;
  rgtrUpInstCdNm: string;
  sbizCd: string;
  sbmsnDcmntCn: string;
  schoolCd: string;
  sprtArvlSeqYn: string;
  sprtSclCnt: string;
  sprtSclLmtYn: string;
  sprtTrgtAgeLmtYn: string;
  sprtTrgtMaxAge: string;
  sprtTrgtMinAge: string;
  sprvsnInstCd: string;
  sprvsnInstCdNm: string;
  sprvsnInstPicNm: string;
  srngMthdCn: string;
  zipCd?: string;
}

/** API 응답 필드명 `pagging` (오타 그대로 유지) */
export interface YouthPolicyPaging {
  totCount: number;
  pageNum: number;
  pageSize: number;
}

export interface YouthPolicyResult {
  pagging: YouthPolicyPaging;
  youthPolicyList: YouthPolicy[];
}

export interface PublicDataResponse {
  resultCode: number;
  resultMessage: string;
  result: YouthPolicyResult;
}
