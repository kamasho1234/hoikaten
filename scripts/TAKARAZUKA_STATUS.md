# Takarazuka (宝塚市) - Data Collection Status

## Status: PENDING - Official R8 PDF Not Yet Available

As of June 4, 2026, the official Takarazuka City R8 (2026) childcare facility utilization adjustment standards document is not publicly available online.

## Search Results
- **Official City Contact**: Takarazuka City Child Future Division, Childcare Business Division (保育事業課)
  - Phone: 0797-77-2037
  - Website: https://www.city.takarazuka.hyogo.jp/kyoiku/gakkoshisetsu/1000105/1027922/index.html
- **R7 Documents Available**: Fiscal year 2025 documents are available on the official website
- **R8 Announcement**: City has confirmed R8 enrollment procedures but specific PDF with utilization adjustment criteria not yet indexed

## Next Steps
1. Contact Takarazuka City childcare department directly
2. Request official R8 "利用調整基準表" (Utilization Adjustment Standards Table) PDF
3. Once PDF is obtained, create `src/lib/data/takarazuka.ts` following the pattern guide

## Reference Documents
- **Kakogawa (加古川市)**: COMPLETED
  - File: `src/lib/data/kakogawa.ts`
  - Source: https://www.city.kakogawa.lg.jp/material/files/group/49/tennsuuhyou.pdf
  - Max Points: 22 (11 per parent + 11 adjustment)
  
- **Sanda (三田市)**: COMPLETED
  - File: `src/lib/data/sanda.ts`
  - Source: https://www.city.sanda.lg.jp/material/files/group/25/23_R8_riyoutyoseihyou.pdf
  - Max Points: 40 (20 per parent + 20 adjustment, with single parent bonus)

## Document Pattern
Expected structure for Takarazuka:
- Employment tiers: 8+ categories
- Adjustment points: 8+ categories
- Special considerations: Siblings, single parent, disability, etc.
- Likely similar to neighboring municipalities (Kakogawa/Sanda)
