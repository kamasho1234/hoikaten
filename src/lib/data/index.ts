import type { MunicipalityData } from '../types';
import { setagayaData } from './setagaya';
import { yokohamaData } from './yokohama';
import { osakaData } from './osaka';
import { kawasakiData } from './kawasaki';
import { nagoyaData } from './nagoya';
import { saitamaData } from './saitama';
import { sapporoData } from './sapporo';
import { kobeData } from './kobe';
import { fukuokaData } from './fukuoka';
import { hiroshimaData } from './hiroshima';
import { sendaiData } from './sendai';
import { kyotoData } from './kyoto';
import { kitakyushuData } from './kitakyushu';
import { hamamatsuData } from './hamamatsu';
import { chibaData } from './chiba';
import { adachiData } from './adachi';
import { suginamiData } from './suginami';
import { itabashiData } from './itabashi';
import { nerimaData } from './nerima';
import { otaData } from './ota';
import { edogawaData } from './edogawa';
import { sakaiData } from './sakai';
import { niigataData } from './niigata';
import { sagamiharaData } from './sagamihara';
import { nakanoData } from './nakano';
import { kitaData } from './kita';
import { arakawaData } from './arakawa';
import { shinagawaData } from './shinagawa';
import { meguroData } from './meguro';
import { shibuyaData } from './shibuya';
import { bunkyoData } from './bunkyo';
import { taitoData } from './taito';
import { sumidaData } from './sumida';
import { katsushikaData } from './katsushika';
import { minatoData } from './minato';
import { chuoData } from './chuo';
import { chiyodaData } from './chiyoda';
import { kotoData } from './koto';
import { okayamaData } from './okayama';
import { kumamotoData } from './kumamoto';
import { shizuokaData } from './shizuoka';
import { machidaData } from './machida';
import { fujisawaData } from './fujisawa';
import { toyonakaData } from './toyonaka';
import { yokosukaData } from './yokosuka';
import { kagoshimaData } from './kagoshima';
import { utsunomiyaData } from './utsunomiya';
import { higashiosakaData } from './higashiosaka';
import { nishinomiyaData } from './nishinomiya';
import { amagasakiData } from './amagasaki';
import { toyotaData } from './toyota';
import { kawagoeData } from './kawagoe';
import { kashibaData } from './kashiba';
import { kanazawaData } from './kanazawa';
import { takatsukiData } from './takatsuki';
import { koshigayaData } from './koshigaya';
import { naraData } from './nara';
import { nagasakiData } from './nagasaki';
import { oitaData } from './oita';
import { nahaData } from './naha';
import { akashiData } from './akashi';
import { suitaData } from './suita';
import { okazakiData } from './okazaki';
import { ichinomiyaData } from './ichinomiya';
import { hirakataData } from './hirakata';
import { otsuData } from './otsu';
import { asahikawaData } from './asahikawa';
import { hakodateData } from './hakodate';
import { mitoData } from './mito';
import { maebashiData } from './maebashi';
import { takasakiData } from './takasaki';
import { aomoriData } from './aomori';
import { moriokaData } from './morioka';
import { akitaData } from './akita';
import { yamagataData } from './yamagata';
import { fukushimaData } from './fukushima';
import { koriyamaData } from './koriyama';
import { iwakiData } from './iwaki';
import { toyamaData } from './toyama';
import { fukuiData } from './fukui';
import { naganoData } from './nagano';
import { gifuData } from './gifu';
import { toyohashiData } from './toyohashi';
import { wakayamaData } from './wakayama';
import { kurashikiData } from './kurashiki';
import { fukuyamaData } from './fukuyama';
import { kureData } from './kure';
import { shimonosekiData } from './shimonoseki';
import { matsueData } from './matsue';
import { kochiData } from './kochi';
import { saseboData } from './sasebo';
import { tottoriData } from './tottori';
import { kurumeData } from './kurume';
import { miyazakiData } from './miyazaki';
import { omeData } from './ome';
import { koganeiData } from './koganei';
import { kokubunjiData } from './kokubunji';
import { tamaData } from './tama';
import { kodairaData } from './kodaira';
import { higashimurayamaData } from './higashimurayama';
import { nishitokyoData } from './nishitokyo';
import { mitakaData } from './mitaka';
import { hinoData } from './hino';
import { musashinoData } from './musashino';
import { hiratsukaData } from './hiratsuka';
import { chigasakiData } from './chigasaki';
import { yamatoData } from './yamato';
import { tokorozawaData } from './tokorozawa';
import { sokaData } from './soka';
import { kasukabeData } from './kasukabe';
import { ageoData } from './ageo';
import { kumagayaData } from './kumagaya';
import { sayamaData } from './sayama';
import { misatoData } from './misato';
import { ibarakiData } from './ibaraki';
import { yaoData } from './yao';
import { neyagawaData } from './neyagawa';
import { kishiwadaData } from './kishiwada';
import { moriguchiData } from './moriguchi';
import { ikedaData } from './ikeda';
import { tokushimaData } from './tokushima';
import { tsuData } from './tsu';
import { kofuData } from './kofu';
import { matsumotoData } from './matsumoto';
import { yokkaichiData } from './yokkaichi';
import { kusatsuData } from './kusatsu';
import { ichikawaData } from './ichikawa';
import { nagareyamaData } from './nagareyama';
import { itamiData } from './itami';
import { kawanishiData } from './kawanishi';
import { kasugaiData } from './kasugai';
import { toyokawaData } from './toyokawa';
import { omutaData } from './omuta';
import { kasugaData } from './kasuga';
import { tomakomaiData } from './tomakomai';
import { obihiroData } from './obihiro';
import { kushiroData } from './kushiro';
import { ujiData } from './uji';
import { higashihiroshimaData } from './higashihiroshima';
import { chofuData } from './chofu';
import { fuchuData } from './fuchu';
import { funabashiData } from './funabashi';
import { hachiojiData } from './hachioji';
import { himejiData } from './himeji';
import { kawaguchiData } from './kawaguchi';
import { matsuyamaData } from './matsuyama';
import { nagaokaData } from './nagaoka';
import { fujiData } from './fuji';
import { hachinoheData } from './hachinohe';
import { izumiData } from './izumi';
import { irumaData } from './iruma';
import { todaData } from './toda';
import { asakaData } from './asaka';
import { zamaData } from './zama';
import { daitoData } from './daito';
import { matsubaraData } from './matsubara';
import { imabariData } from './imabari';
import { suzukaData } from './suzuka';
import { joetsuData } from './joetsu';
import { hikoneData } from './hikone';
import { numazuData } from './numazu';
import { takaokaData } from './takaoka';
import { ogakiData } from './ogaki';
import { itoshimaData } from './itoshima';
import { higashikurumeData } from './higashikurume';
import { obuData } from './obu';
import { tondabayashiData } from './tondabayashi';
import { fukayaData } from './fukaya';
import { fujiminoData } from './fujimino';
import { fujimiData } from './fujimi';
import { konosuData } from './konosu';
import { sakadoData } from './sakado';
import { gyodaData } from './gyoda';
import { higashimatsuyamaData } from './higashimatsuyama';
import { shikiData } from './shiki';
import { habikinoData } from './habikino';
import { chikushinoData } from './chikushino';
import { nisshinData } from './nisshin';
import { kukiData } from './kuki';
import { kazoData } from './kazo';
import { onojoData } from './onojo';
import { dazaifuData } from './dazaifu';
import { nagaokakyoData } from './nagaokakyo';
import { kashiharaData } from './kashihara';
import { ikomaData } from './ikoma';
import { okegawaData } from './okegawa';
import { katanoData } from './katano';
import { isesakiData } from './isesaki';
import { otaGunmaData } from './ota-gunma';
import { kiryuData } from './kiryu';
import { hitachiData } from './hitachi';
import { hitachinakaData } from './hitachinaka';
import { kogaData } from './koga';
import { torideData } from './toride';
import { moriyaData } from './moriya';
import { hirosakiData } from './hirosaki';
import { ishinomakiData } from './ishinomaki';
import { oyamaData } from './oyama';
import { ashikagaData } from './ashikaga';
import { tochigiCityData } from './tochigi-city';
import { nasushiobaraData } from './nasushiobara';
import { sanoData } from './sano';
import { mokaData } from './moka';
import { tsuruokaData } from './tsuruoka';
import { sakataData } from './sakata';
import { iizukaData } from './iizuka';
import { munakataData } from './munakata';
import { ginowanData } from './ginowan';
import { kitakamiData } from './kitakami';
import { urumaData } from './uruma';
import { niihamaData } from './niihama';
import { ishigakiData } from './ishigaki';
import { izumoData } from './izumo';
import { iwataData } from './iwata';
import { miyakonojoData } from './miyakonojo';
import { matsusakaData } from './matsusaka';
import { uedaData } from './ueda';
import { fujiedaData } from './fujieda';
import { kuwanaData } from './kuwana';
import { yaizuData } from './yaizu';
import { isahayaData } from './isahaya';
import { fujinomiyaData } from './fujinomiya';
import { onomichiData } from './onomichi';
import { osakiData } from './osaki';
import { kakamigaharaData } from './kakamigahara';
import { yonagoData } from './yonago';
import { okinawaData } from './okinawa';
import { tsuchiuraData } from './tsuchiura';
import { kirishimaData } from './kirishima';
import { yatsushiroData } from './yatsushiro';
import { iseData } from './ise';
import { kakegawaData } from './kakegawa';
import { nagahamaData } from './nagahama';
import { ichinosekiData } from './ichinoseki';
import { iidaData } from './iida';
import { mishimaData } from './mishima';
import { beppuData } from './beppu';
import { nobeokaData } from './nobeoka';
import { hakusanData } from './hakusan';
import { otaruData } from './otaru';
import { wakoData } from './wako';
import { yashioData } from './yashio';
import { warabiData } from './warabi';
import { konanData } from './konan';
import { kitanagoyaData } from './kitanagoya';
import { izumisanoData } from './izumisano';
import { tsuyamaData } from './tsuyama';
import { oshuData } from './oshu';
import { kitamiData } from './kitami';
import { igaData } from './iga';
import { hatsukaichiData } from './hatsukaichi';
import { miharaData } from './mihara';
import { toyoakeData } from './toyoake';
import { osakasayamaData } from './osakasayama';
import { eniwaData } from './eniwa';
import { kitahiroshimaData } from './kitahiroshima';
import { hitaData } from './hita';
import { sanyoonodaData } from './sanyoonoda';
import { sennanData } from './sennan';
import { itomanData } from './itoman';
import { omuraData } from './omura';
import { kanoyaData } from './kanoya';
import { satsumasendaiData } from './satsumasendai';
import { ashiyaData } from './ashiya';
import { mikiData } from './miki';
import { nakatsuData } from './nakatsu';
import { kashiwaraData } from './kashiwara';
import { shijonawateData } from './shijonawate';
import { tagajoData } from './tagajo';
import { tomiyaData } from './tomiya';
import { kawachinaganoData } from './kawachinagano';
import { akirunoData } from './akiruno';
import { settsuData } from './settsu';
import { yamatokooriyamaData } from './yamatokooriyama';
import { natoriData } from './natori';
import { owariasahiData } from './owariasahi';
import { yoshikawaData } from './yoshikawa';
import { izumiotsuData } from './izumiotsu';
import { fussaData } from './fussa';
import { hamuraData } from './hamura';
import { abikoData } from './abiko';
import { akishimaData } from './akishima';
import { atsugiData } from './atsugi';
import { kaniData } from './kani';
import { ryugasakiData } from './ryugasaki';
import { sekiData } from './seki';
import { tajimiData } from './tajimi';
import { tenriData } from './tenri';
import { ushikuData } from './ushiku';
import { kashiwaData } from './kashiwa';
import { matsudoData } from './matsudo';
import { yamaguchiData } from './yamaguchi';
import { takamatsuData } from './takamatsu';
import { sagaData } from './saga';
import { odawaraData } from './odawara';
import { kamakuraData } from './kamakura';
import { saijoData } from './saijo';
import { nankokuData } from './nankoku';
import { yachiyoData } from './yachiyo';
import { kamagayaData } from './kamagaya';
import { zushiData } from './zushi';
import { naritaData } from './narita';
import { hannoData } from './hanno';
import { hashimotoData } from './hashimoto';
import { niizaData } from './niiza';
import { urayasuData } from './urayasu';
import { tsukubaData } from './tsukuba';
import { kanumaData } from './kanuma';
import { tatebayashiData } from './tatebayashi';
import { aizuwakamatsuData } from './aizuwakamatsu';
import { azuminoData } from './azumino';
import { echizenData } from './echizen';
import { kashiwazakiData } from './kashiwazaki';
import { narashinoData } from './narashino';
import { shibukwaData } from './shibukawa';
import { fujiokaData } from './fujioka';
import { muroranData } from './muroran';
import { shirakwaData } from './shirakawa';
import { sanjoData } from './sanjo';
import { sibataData } from './shibata';
import { sojaData } from './soja';
import { chitaData } from './chita';
import { tokaiData } from './tokai';
import { inuyamaData } from './inuyama';
import { iwakuniData } from './iwakuni';
import { tosuData } from './tosu';
import { koshiData } from './koshi';
import { nodaData } from './noda';
import { sakuraData } from './sakura';
import { kisarazuData } from './kisarazu';
import { kakogawaData } from './kakogawa';
import { sandaData } from './sanda';
import { shinjukuData } from './shinjuku';
import { toshimaData } from './toshima';
import { ebinaData } from './ebina';
import { urasoeData } from './urasoe';
import { hadanoData } from './hadano';
import { ichiharaData } from './ichihara';
import { tachikawaData } from './tachikawa';
import { komakiData } from './komaki';
import { setoData } from './seto';
import { inazawaData } from './inazawa';
import { ubeData } from './ube';
import { kadomaData } from './kadoma';
import { kariyaData } from './kariya';
import { anjoData } from './anjo';
import { inzaiData } from './inzai';
import { minohData } from './minoh';
import { chitoseData } from './chitose';
import { takarazukaData } from './takarazuka';
import { marugameData } from './marugame';
import { higashiomiData } from './higashiomi';
import { hofuData } from './hofu';
import { ebetsuData } from './ebetsu';
import { iseharaData } from './isehara';
import { higashiyamatoData } from './higashiyamato';
import { musashimurayamaData } from './musashimurayama';
import { iwamizawaData } from './iwamizawa';
import { mobaraData } from './mobara';
import { otakeData } from './otake';
import { minamikyushuData } from './minamikyushu';
import { utoData } from './uto';
import { katsuyamaData } from './katsuyama';
import { shiroiData } from './shiroi';
import { yamanashiData } from './yamanashi';
import { fukuroiData } from './fukuroi';
import { tendoData } from './tendo';
import { kamisuData } from './kamisu';
import { shimotsukeData } from './shimotsuke';
import { tomisatoData } from './tomisato';
import { hokotaData } from './hokota';
import { inagiData } from './inagi';
import { yukiData } from './yuki';
import { sodegauraData } from './sodegaura';
import { kushiroChoData } from './kushiro-cho';
import { gokaData } from './goka';
import { handaData } from './handa';
import { yokoteData } from './yokote';
import { misatomiyagiData } from './misato-miyagi';
import { sosaData } from './sosa';
import { murakamiData } from './murakami';
import { mannoData } from './manno';
import { tamanaData } from './tamana';
import { ukiData } from './uki';
import { kagaminoData } from './kagamino';
import { oganoData } from './ogano';
import { toyoyamaData } from './toyoyama';
import { kumiyamaData } from './kumiyama';
import { yahabaData } from './yahaba';
import { setouchiData } from './setouchi';
import { kuroishiData } from './kuroishi';
import { minokamoData } from './minokamo';
import { kutchanData } from './kutchan';
import { shooData } from './shoo';
import { chikuseiData } from './chikusei';
import { kawamataData } from './kawamata';
import { yachimataData } from './yachimata';
import { koshuData } from './koshu';
import { shiroishiData } from './shiroishi';
import { masakiData } from './masaki';
import { ibarakiMachiData } from './ibaraki-machi';
import { mizuhoData } from './mizuho';
import { rifuData } from './rifu';
import { tonoData } from './tono';
import { fukutsuData } from './fukutsu';
import { hashimaData } from './hashima';
import { kanegasakiData } from './kanegasaki';
import { namegatadata } from './namegata';
import { tokigawaData } from './tokigawa';
import { kawajimaData } from './kawajima';
import { kanraData } from './kanra';
import { izumiCityData } from './izumi-city';
import { akaiwaData } from './akaiwa';
import { uonamaData } from './uonuma';
import { asakuchiData } from './asakuchi';
import { noshiroData } from './noshiro';
import { amaData } from './ama';
import { sanukiData } from './sanuki';
import { yotsukaidoData } from './yotsukaido';
import { kikuyoData } from './kikuyo';
import { katagamiData } from './katagami';
import { kamiData } from './kami';
import { minamiAlpsData } from './minami-alps';
import { kamogawaData } from './kamogawa';
import { touganeData } from './tougane';

const municipalityMap: Record<string, MunicipalityData> = {
  [setagayaData.municipality.slug]: setagayaData,
  [yokohamaData.municipality.slug]: yokohamaData,
  [osakaData.municipality.slug]: osakaData,
  [kawasakiData.municipality.slug]: kawasakiData,
  [nagoyaData.municipality.slug]: nagoyaData,
  [saitamaData.municipality.slug]: saitamaData,
  [sapporoData.municipality.slug]: sapporoData,
  [kobeData.municipality.slug]: kobeData,
  [fukuokaData.municipality.slug]: fukuokaData,
  [hiroshimaData.municipality.slug]: hiroshimaData,
  [sendaiData.municipality.slug]: sendaiData,
  [kyotoData.municipality.slug]: kyotoData,
  [kitakyushuData.municipality.slug]: kitakyushuData,
  [hamamatsuData.municipality.slug]: hamamatsuData,
  [chibaData.municipality.slug]: chibaData,
  [adachiData.municipality.slug]: adachiData,
  [suginamiData.municipality.slug]: suginamiData,
  [itabashiData.municipality.slug]: itabashiData,
  [nerimaData.municipality.slug]: nerimaData,
  [otaData.municipality.slug]: otaData,
  [edogawaData.municipality.slug]: edogawaData,
  [sakaiData.municipality.slug]: sakaiData,
  [niigataData.municipality.slug]: niigataData,
  [sagamiharaData.municipality.slug]: sagamiharaData,
  [nakanoData.municipality.slug]: nakanoData,
  [kitaData.municipality.slug]: kitaData,
  [arakawaData.municipality.slug]: arakawaData,
  [shinagawaData.municipality.slug]: shinagawaData,
  [meguroData.municipality.slug]: meguroData,
  [shibuyaData.municipality.slug]: shibuyaData,
  [bunkyoData.municipality.slug]: bunkyoData,
  [taitoData.municipality.slug]: taitoData,
  [sumidaData.municipality.slug]: sumidaData,
  [katsushikaData.municipality.slug]: katsushikaData,
  [minatoData.municipality.slug]: minatoData,
  [chuoData.municipality.slug]: chuoData,
  [chiyodaData.municipality.slug]: chiyodaData,
  [kotoData.municipality.slug]: kotoData,
  [okayamaData.municipality.slug]: okayamaData,
  [kumamotoData.municipality.slug]: kumamotoData,
  [shizuokaData.municipality.slug]: shizuokaData,
  [machidaData.municipality.slug]: machidaData,
  [fujisawaData.municipality.slug]: fujisawaData,
  [toyonakaData.municipality.slug]: toyonakaData,
  [yokosukaData.municipality.slug]: yokosukaData,
  [kagoshimaData.municipality.slug]: kagoshimaData,
  [utsunomiyaData.municipality.slug]: utsunomiyaData,
  [higashiosakaData.municipality.slug]: higashiosakaData,
  [nishinomiyaData.municipality.slug]: nishinomiyaData,
  [amagasakiData.municipality.slug]: amagasakiData,
  [toyotaData.municipality.slug]: toyotaData,
  [kawagoeData.municipality.slug]: kawagoeData,
  [kashibaData.municipality.slug]: kashibaData,
  [kanazawaData.municipality.slug]: kanazawaData,
  [takatsukiData.municipality.slug]: takatsukiData,
  [koshigayaData.municipality.slug]: koshigayaData,
  [naraData.municipality.slug]: naraData,
  [nagasakiData.municipality.slug]: nagasakiData,
  [oitaData.municipality.slug]: oitaData,
  [nahaData.municipality.slug]: nahaData,
  [akashiData.municipality.slug]: akashiData,
  [suitaData.municipality.slug]: suitaData,
  [okazakiData.municipality.slug]: okazakiData,
  [ichinomiyaData.municipality.slug]: ichinomiyaData,
  [hirakataData.municipality.slug]: hirakataData,
  [otsuData.municipality.slug]: otsuData,
  [asahikawaData.municipality.slug]: asahikawaData,
  [hakodateData.municipality.slug]: hakodateData,
  [mitoData.municipality.slug]: mitoData,
  [maebashiData.municipality.slug]: maebashiData,
  [takasakiData.municipality.slug]: takasakiData,
  [aomoriData.municipality.slug]: aomoriData,
  [moriokaData.municipality.slug]: moriokaData,
  [akitaData.municipality.slug]: akitaData,
  [yamagataData.municipality.slug]: yamagataData,
  [fukushimaData.municipality.slug]: fukushimaData,
  [koriyamaData.municipality.slug]: koriyamaData,
  [iwakiData.municipality.slug]: iwakiData,
  [toyamaData.municipality.slug]: toyamaData,
  [fukuiData.municipality.slug]: fukuiData,
  [naganoData.municipality.slug]: naganoData,
  [gifuData.municipality.slug]: gifuData,
  [toyohashiData.municipality.slug]: toyohashiData,
  [wakayamaData.municipality.slug]: wakayamaData,
  [kurashikiData.municipality.slug]: kurashikiData,
  [fukuyamaData.municipality.slug]: fukuyamaData,
  [kureData.municipality.slug]: kureData,
  [shimonosekiData.municipality.slug]: shimonosekiData,
  [matsueData.municipality.slug]: matsueData,
  [kochiData.municipality.slug]: kochiData,
  [saseboData.municipality.slug]: saseboData,
  [tottoriData.municipality.slug]: tottoriData,
  [kurumeData.municipality.slug]: kurumeData,
  [miyazakiData.municipality.slug]: miyazakiData,
  [omeData.municipality.slug]: omeData,
  [koganeiData.municipality.slug]: koganeiData,
  [kokubunjiData.municipality.slug]: kokubunjiData,
  [tamaData.municipality.slug]: tamaData,
  [kodairaData.municipality.slug]: kodairaData,
  [higashimurayamaData.municipality.slug]: higashimurayamaData,
  [nishitokyoData.municipality.slug]: nishitokyoData,
  [mitakaData.municipality.slug]: mitakaData,
  [hinoData.municipality.slug]: hinoData,
  [musashinoData.municipality.slug]: musashinoData,
  [hiratsukaData.municipality.slug]: hiratsukaData,
  [chigasakiData.municipality.slug]: chigasakiData,
  [yamatoData.municipality.slug]: yamatoData,
  [tokorozawaData.municipality.slug]: tokorozawaData,
  [sokaData.municipality.slug]: sokaData,
  [kasukabeData.municipality.slug]: kasukabeData,
  [ageoData.municipality.slug]: ageoData,
  [kumagayaData.municipality.slug]: kumagayaData,
  [sayamaData.municipality.slug]: sayamaData,
  [misatoData.municipality.slug]: misatoData,
  [ibarakiData.municipality.slug]: ibarakiData,
  [yaoData.municipality.slug]: yaoData,
  [neyagawaData.municipality.slug]: neyagawaData,
  [kishiwadaData.municipality.slug]: kishiwadaData,
  [moriguchiData.municipality.slug]: moriguchiData,
  [ikedaData.municipality.slug]: ikedaData,
  [tokushimaData.municipality.slug]: tokushimaData,
  [tsuData.municipality.slug]: tsuData,
  [kofuData.municipality.slug]: kofuData,
  [matsumotoData.municipality.slug]: matsumotoData,
  [yokkaichiData.municipality.slug]: yokkaichiData,
  [kusatsuData.municipality.slug]: kusatsuData,
  [ichikawaData.municipality.slug]: ichikawaData,
  [nagareyamaData.municipality.slug]: nagareyamaData,
  [itamiData.municipality.slug]: itamiData,
  [kawanishiData.municipality.slug]: kawanishiData,
  [kasugaiData.municipality.slug]: kasugaiData,
  [toyokawaData.municipality.slug]: toyokawaData,
  [omutaData.municipality.slug]: omutaData,
  [kasugaData.municipality.slug]: kasugaData,
  [tomakomaiData.municipality.slug]: tomakomaiData,
  [obihiroData.municipality.slug]: obihiroData,
  [kushiroData.municipality.slug]: kushiroData,
  [ujiData.municipality.slug]: ujiData,
  [higashihiroshimaData.municipality.slug]: higashihiroshimaData,
  [chofuData.municipality.slug]: chofuData,
  [fuchuData.municipality.slug]: fuchuData,
  [funabashiData.municipality.slug]: funabashiData,
  [hachiojiData.municipality.slug]: hachiojiData,
  [himejiData.municipality.slug]: himejiData,
  [kawaguchiData.municipality.slug]: kawaguchiData,
  [matsuyamaData.municipality.slug]: matsuyamaData,
  [nagaokaData.municipality.slug]: nagaokaData,
  [fujiData.municipality.slug]: fujiData,
  [hachinoheData.municipality.slug]: hachinoheData,
  [izumiData.municipality.slug]: izumiData,
  [irumaData.municipality.slug]: irumaData,
  [todaData.municipality.slug]: todaData,
  [asakaData.municipality.slug]: asakaData,
  [zamaData.municipality.slug]: zamaData,
  [daitoData.municipality.slug]: daitoData,
  [matsubaraData.municipality.slug]: matsubaraData,
  [imabariData.municipality.slug]: imabariData,
  [suzukaData.municipality.slug]: suzukaData,
  [joetsuData.municipality.slug]: joetsuData,
  [hikoneData.municipality.slug]: hikoneData,
  [numazuData.municipality.slug]: numazuData,
  [takaokaData.municipality.slug]: takaokaData,
  [ogakiData.municipality.slug]: ogakiData,
  [itoshimaData.municipality.slug]: itoshimaData,
  [higashikurumeData.municipality.slug]: higashikurumeData,
  [fukayaData.municipality.slug]: fukayaData,
  [fujiminoData.municipality.slug]: fujiminoData,
  [fujimiData.municipality.slug]: fujimiData,
  [konosuData.municipality.slug]: konosuData,
  [sakadoData.municipality.slug]: sakadoData,
  [gyodaData.municipality.slug]: gyodaData,
  [higashimatsuyamaData.municipality.slug]: higashimatsuyamaData,
  [shikiData.municipality.slug]: shikiData,
  [habikinoData.municipality.slug]: habikinoData,
  [chikushinoData.municipality.slug]: chikushinoData,
  [nisshinData.municipality.slug]: nisshinData,
  [obuData.municipality.slug]: obuData,
  [tondabayashiData.municipality.slug]: tondabayashiData,
  [kukiData.municipality.slug]: kukiData,
  [kazoData.municipality.slug]: kazoData,
  [onojoData.municipality.slug]: onojoData,
  [dazaifuData.municipality.slug]: dazaifuData,
  [nagaokakyoData.municipality.slug]: nagaokakyoData,
  [kashiharaData.municipality.slug]: kashiharaData,
  [ikomaData.municipality.slug]: ikomaData,
  [okegawaData.municipality.slug]: okegawaData,
  [katanoData.municipality.slug]: katanoData,
  [isesakiData.municipality.slug]: isesakiData,
  [otaGunmaData.municipality.slug]: otaGunmaData,
  [kiryuData.municipality.slug]: kiryuData,
  [hitachiData.municipality.slug]: hitachiData,
  [hitachinakaData.municipality.slug]: hitachinakaData,
  [kogaData.municipality.slug]: kogaData,
  [torideData.municipality.slug]: torideData,
  [moriyaData.municipality.slug]: moriyaData,
  [hirosakiData.municipality.slug]: hirosakiData,
  [ishinomakiData.municipality.slug]: ishinomakiData,
  [oyamaData.municipality.slug]: oyamaData,
  [ashikagaData.municipality.slug]: ashikagaData,
  [tochigiCityData.municipality.slug]: tochigiCityData,
  [nasushiobaraData.municipality.slug]: nasushiobaraData,
  [sanoData.municipality.slug]: sanoData,
  [mokaData.municipality.slug]: mokaData,
  [tsuruokaData.municipality.slug]: tsuruokaData,
  [sakataData.municipality.slug]: sakataData,
  [iizukaData.municipality.slug]: iizukaData,
  [munakataData.municipality.slug]: munakataData,
  [ginowanData.municipality.slug]: ginowanData,
  [kitakamiData.municipality.slug]: kitakamiData,
  [urumaData.municipality.slug]: urumaData,
  [niihamaData.municipality.slug]: niihamaData,
  [ishigakiData.municipality.slug]: ishigakiData,
  [izumoData.municipality.slug]: izumoData,
  [iwataData.municipality.slug]: iwataData,
  [miyakonojoData.municipality.slug]: miyakonojoData,
  [matsusakaData.municipality.slug]: matsusakaData,
  [uedaData.municipality.slug]: uedaData,
  [fujiedaData.municipality.slug]: fujiedaData,
  [kuwanaData.municipality.slug]: kuwanaData,
  [yaizuData.municipality.slug]: yaizuData,
  [isahayaData.municipality.slug]: isahayaData,
  [fujinomiyaData.municipality.slug]: fujinomiyaData,
  [onomichiData.municipality.slug]: onomichiData,
  [osakiData.municipality.slug]: osakiData,
  [kakamigaharaData.municipality.slug]: kakamigaharaData,
  [yonagoData.municipality.slug]: yonagoData,
  [okinawaData.municipality.slug]: okinawaData,
  [tsuchiuraData.municipality.slug]: tsuchiuraData,
  [kirishimaData.municipality.slug]: kirishimaData,
  [yatsushiroData.municipality.slug]: yatsushiroData,
  [iseData.municipality.slug]: iseData,
  [kakegawaData.municipality.slug]: kakegawaData,
  [nagahamaData.municipality.slug]: nagahamaData,
  [ichinosekiData.municipality.slug]: ichinosekiData,
  [iidaData.municipality.slug]: iidaData,
  [mishimaData.municipality.slug]: mishimaData,
  [beppuData.municipality.slug]: beppuData,
  [nobeokaData.municipality.slug]: nobeokaData,
  [hakusanData.municipality.slug]: hakusanData,
  [otaruData.municipality.slug]: otaruData,
  [wakoData.municipality.slug]: wakoData,
  [yashioData.municipality.slug]: yashioData,
  [warabiData.municipality.slug]: warabiData,
  [konanData.municipality.slug]: konanData,
  [kitanagoyaData.municipality.slug]: kitanagoyaData,
  [izumisanoData.municipality.slug]: izumisanoData,
  [tsuyamaData.municipality.slug]: tsuyamaData,
  [oshuData.municipality.slug]: oshuData,
  [kitamiData.municipality.slug]: kitamiData,
  [igaData.municipality.slug]: igaData,
  [kawachinaganoData.municipality.slug]: kawachinaganoData,
  [akirunoData.municipality.slug]: akirunoData,
  [settsuData.municipality.slug]: settsuData,
  [yamatokooriyamaData.municipality.slug]: yamatokooriyamaData,
  [natoriData.municipality.slug]: natoriData,
  [owariasahiData.municipality.slug]: owariasahiData,
  [yoshikawaData.municipality.slug]: yoshikawaData,
  [izumiotsuData.municipality.slug]: izumiotsuData,
  [fussaData.municipality.slug]: fussaData,
  [hamuraData.municipality.slug]: hamuraData,
  [omuraData.municipality.slug]: omuraData,
  [kanoyaData.municipality.slug]: kanoyaData,
  [satsumasendaiData.municipality.slug]: satsumasendaiData,
  [ashiyaData.municipality.slug]: ashiyaData,
  [mikiData.municipality.slug]: mikiData,
  [nakatsuData.municipality.slug]: nakatsuData,
  [kashiwaraData.municipality.slug]: kashiwaraData,
  [shijonawateData.municipality.slug]: shijonawateData,
  [tagajoData.municipality.slug]: tagajoData,
  [tomiyaData.municipality.slug]: tomiyaData,
  [hatsukaichiData.municipality.slug]: hatsukaichiData,
  [miharaData.municipality.slug]: miharaData,
  [toyoakeData.municipality.slug]: toyoakeData,
  [osakasayamaData.municipality.slug]: osakasayamaData,
  [eniwaData.municipality.slug]: eniwaData,
  [kitahiroshimaData.municipality.slug]: kitahiroshimaData,
  [hitaData.municipality.slug]: hitaData,
  [sanyoonodaData.municipality.slug]: sanyoonodaData,
  [sennanData.municipality.slug]: sennanData,
  [itomanData.municipality.slug]: itomanData,
  [abikoData.municipality.slug]: abikoData,
  [akishimaData.municipality.slug]: akishimaData,
  [atsugiData.municipality.slug]: atsugiData,
  [kaniData.municipality.slug]: kaniData,
  [ryugasakiData.municipality.slug]: ryugasakiData,
  [sekiData.municipality.slug]: sekiData,
  [tajimiData.municipality.slug]: tajimiData,
  [tenriData.municipality.slug]: tenriData,
  [ushikuData.municipality.slug]: ushikuData,
  [kashiwaData.municipality.slug]: kashiwaData,
  [matsudoData.municipality.slug]: matsudoData,
  [yamaguchiData.municipality.slug]: yamaguchiData,
  [takamatsuData.municipality.slug]: takamatsuData,
  [sagaData.municipality.slug]: sagaData,
  [odawaraData.municipality.slug]: odawaraData,
  [kamakuraData.municipality.slug]: kamakuraData,
  [saijoData.municipality.slug]: saijoData,
  [nankokuData.municipality.slug]: nankokuData,
  [yachiyoData.municipality.slug]: yachiyoData,
  [kamagayaData.municipality.slug]: kamagayaData,
  [zushiData.municipality.slug]: zushiData,
  [naritaData.municipality.slug]: naritaData,
  [hannoData.municipality.slug]: hannoData,
  [hashimotoData.municipality.slug]: hashimotoData,
  [niizaData.municipality.slug]: niizaData,
  [urayasuData.municipality.slug]: urayasuData,
  [tsukubaData.municipality.slug]: tsukubaData,
  [kanumaData.municipality.slug]: kanumaData,
  [tatebayashiData.municipality.slug]: tatebayashiData,
  [aizuwakamatsuData.municipality.slug]: aizuwakamatsuData,
  [azuminoData.municipality.slug]: azuminoData,
  [echizenData.municipality.slug]: echizenData,
  [kashiwazakiData.municipality.slug]: kashiwazakiData,
  [narashinoData.municipality.slug]: narashinoData,
  [shibukwaData.municipality.slug]: shibukwaData,
  [fujiokaData.municipality.slug]: fujiokaData,
  [muroranData.municipality.slug]: muroranData,
  [shirakwaData.municipality.slug]: shirakwaData,
  [sanjoData.municipality.slug]: sanjoData,
  [sibataData.municipality.slug]: sibataData,
  [sojaData.municipality.slug]: sojaData,
  [chitaData.municipality.slug]: chitaData,
  [tokaiData.municipality.slug]: tokaiData,
  [inuyamaData.municipality.slug]: inuyamaData,
  [iwakuniData.municipality.slug]: iwakuniData,
  [tosuData.municipality.slug]: tosuData,
  [koshiData.municipality.slug]: koshiData,
  [nodaData.municipality.slug]: nodaData,
  [sakuraData.municipality.slug]: sakuraData,
  [kisarazuData.municipality.slug]: kisarazuData,
  [kakogawaData.municipality.slug]: kakogawaData,
  [sandaData.municipality.slug]: sandaData,
  [shinjukuData.municipality.slug]: shinjukuData,
  [toshimaData.municipality.slug]: toshimaData,
  [ebinaData.municipality.slug]: ebinaData,
  [urasoeData.municipality.slug]: urasoeData,
  [hadanoData.municipality.slug]: hadanoData,
  [ichiharaData.municipality.slug]: ichiharaData,
  [tachikawaData.municipality.slug]: tachikawaData,
  [komakiData.municipality.slug]: komakiData,
  [setoData.municipality.slug]: setoData,
  [inazawaData.municipality.slug]: inazawaData,
  [ubeData.municipality.slug]: ubeData,
  [kadomaData.municipality.slug]: kadomaData,
  [kariyaData.municipality.slug]: kariyaData,
  [anjoData.municipality.slug]: anjoData,
  [inzaiData.municipality.slug]: inzaiData,
  [minohData.municipality.slug]: minohData,
  [chitoseData.municipality.slug]: chitoseData,
  [takarazukaData.municipality.slug]: takarazukaData,
  [marugameData.municipality.slug]: marugameData,
  [higashiomiData.municipality.slug]: higashiomiData,
  [hofuData.municipality.slug]: hofuData,
  [ebetsuData.municipality.slug]: ebetsuData,
  [iseharaData.municipality.slug]: iseharaData,
  [higashiyamatoData.municipality.slug]: higashiyamatoData,
  [musashimurayamaData.municipality.slug]: musashimurayamaData,
  [iwamizawaData.municipality.slug]: iwamizawaData,
  [mobaraData.municipality.slug]: mobaraData,
  [otakeData.municipality.slug]: otakeData,
  [minamikyushuData.municipality.slug]: minamikyushuData,
  [utoData.municipality.slug]: utoData,
  [katsuyamaData.municipality.slug]: katsuyamaData,
  [shiroiData.municipality.slug]: shiroiData,
  [yamanashiData.municipality.slug]: yamanashiData,
  [fukuroiData.municipality.slug]: fukuroiData,
  [tendoData.municipality.slug]: tendoData,
  [kamisuData.municipality.slug]: kamisuData,
  [shimotsukeData.municipality.slug]: shimotsukeData,
  [tomisatoData.municipality.slug]: tomisatoData,
  [hokotaData.municipality.slug]: hokotaData,
  [inagiData.municipality.slug]: inagiData,
  [yukiData.municipality.slug]: yukiData,
  [sodegauraData.municipality.slug]: sodegauraData,
  [kushiroChoData.municipality.slug]: kushiroChoData,
  [gokaData.municipality.slug]: gokaData,
  [handaData.municipality.slug]: handaData,
  [yokoteData.municipality.slug]: yokoteData,
  [misatomiyagiData.municipality.slug]: misatomiyagiData,
  [sosaData.municipality.slug]: sosaData,
  [murakamiData.municipality.slug]: murakamiData,
  [mannoData.municipality.slug]: mannoData,
  [tamanaData.municipality.slug]: tamanaData,
  [ukiData.municipality.slug]: ukiData,
  [kagaminoData.municipality.slug]: kagaminoData,
  [oganoData.municipality.slug]: oganoData,
  [toyoyamaData.municipality.slug]: toyoyamaData,
  [kumiyamaData.municipality.slug]: kumiyamaData,
  [yahabaData.municipality.slug]: yahabaData,
  [setouchiData.municipality.slug]: setouchiData,
  [kuroishiData.municipality.slug]: kuroishiData,
  [minokamoData.municipality.slug]: minokamoData,
  [kutchanData.municipality.slug]: kutchanData,
  [shooData.municipality.slug]: shooData,
  [chikuseiData.municipality.slug]: chikuseiData,
  [kawamataData.municipality.slug]: kawamataData,
  [yachimataData.municipality.slug]: yachimataData,
  [koshuData.municipality.slug]: koshuData,
  [shiroishiData.municipality.slug]: shiroishiData,
  [masakiData.municipality.slug]: masakiData,
  [ibarakiMachiData.municipality.slug]: ibarakiMachiData,
  [mizuhoData.municipality.slug]: mizuhoData,
  [rifuData.municipality.slug]: rifuData,
  [tonoData.municipality.slug]: tonoData,
  [fukutsuData.municipality.slug]: fukutsuData,
  [hashimaData.municipality.slug]: hashimaData,
  [kanegasakiData.municipality.slug]: kanegasakiData,
  [namegatadata.municipality.slug]: namegatadata,
  [tokigawaData.municipality.slug]: tokigawaData,
  [kawajimaData.municipality.slug]: kawajimaData,
  [kanraData.municipality.slug]: kanraData,
  [izumiCityData.municipality.slug]: izumiCityData,
  [akaiwaData.municipality.slug]: akaiwaData,
  [uonamaData.municipality.slug]: uonamaData,
  [asakuchiData.municipality.slug]: asakuchiData,
  [noshiroData.municipality.slug]: noshiroData,
  [amaData.municipality.slug]: amaData,
  [sanukiData.municipality.slug]: sanukiData,
  [yotsukaidoData.municipality.slug]: yotsukaidoData,
  [kikuyoData.municipality.slug]: kikuyoData,
  [katagamiData.municipality.slug]: katagamiData,
  [kamiData.municipality.slug]: kamiData,
  [minamiAlpsData.municipality.slug]: minamiAlpsData,
  [kamogawaData.municipality.slug]: kamogawaData,
  [touganeData.municipality.slug]: touganeData,
};

export function getMunicipalityData(slug: string): MunicipalityData | undefined {
  return municipalityMap[slug];
}

export function getAllMunicipalities() {
  return Object.values(municipalityMap).map((d) => d.municipality);
}

export { imabariData, suzukaData, joetsuData, hikoneData, numazuData, takaokaData, ogakiData, itoshimaData, higashikurumeData, obuData, tondabayashiData, fukayaData, fujiminoData, fujimiData, konosuData, sakadoData, gyodaData, higashimatsuyamaData, shikiData, nisshinData, onojoData, dazaifuData, nagaokakyoData, kashiharaData, ikomaData, okegawaData, katanoData };
export { ginowanData, kitakamiData, urumaData, niihamaData, ishigakiData };
export { fujiedaData, kuwanaData, yaizuData, isahayaData, fujinomiyaData, onomichiData, osakiData };
export { kakamigaharaData, yonagoData, okinawaData, tsuchiuraData, kirishimaData, yatsushiroData, iseData, kakegawaData };
export { nagahamaData, ichinosekiData, iidaData, mishimaData, beppuData, nobeokaData, hakusanData, otaruData };
export { wakoData, yashioData, warabiData, konanData, kitanagoyaData, izumisanoData, tsuyamaData, oshuData, kitamiData, igaData };
export { kawachinaganoData, akirunoData, settsuData, yamatokooriyamaData, natoriData, owariasahiData, yoshikawaData, izumiotsuData, fussaData, hamuraData, chitaData, tokaiData, inuyamaData };
export { omuraData, kanoyaData, satsumasendaiData, ashiyaData, mikiData, nakatsuData, kashiwaraData, shijonawateData, tagajoData, tomiyaData };
export { hatsukaichiData, miharaData, toyoakeData, osakasayamaData, eniwaData, kitahiroshimaData, hitaData, sanyoonodaData, sennanData, itomanData };
export { abikoData, akishimaData, atsugiData, kaniData, ryugasakiData, sekiData, tajimiData, tenriData, ushikuData };
export { ebinaData };
export { urasoeData };
export { hadanoData };
export { ichiharaData };
export { tachikawaData };
export { komakiData };
export { setoData };
export { inazawaData };
export { ubeData };
export { kadomaData };
export { kariyaData };
export { anjoData };
export { inzaiData };
export { minohData };
export { chitoseData };
export { takarazukaData };
export { marugameData };
export { higashiomiData };
export { hofuData };
export { ebetsuData };
export { iseharaData };
export { higashiyamatoData };
export { musashimurayamaData };
export { iwamizawaData };
export { mobaraData };
export { otakeData };
export { minamikyushuData };
export { utoData, katsuyamaData, shiroiData, yamanashiData };
export { fukuroiData, tendoData, kamisuData, shimotsukeData, tomisatoData, hokotaData, inagiData };
export { yukiData, sodegauraData, kushiroChoData, gokaData, handaData, yokoteData, misatomiyagiData, sosaData, murakamiData, mannoData, tamanaData, ukiData, kagaminoData, oganoData, toyoyamaData, kumiyamaData, yahabaData, setouchiData, kogaData, kuroishiData, minokamoData, kutchanData, shooData, chikuseiData, kawamataData, yachimataData, koshuData, shiroishiData, masakiData, ibarakiMachiData, mizuhoData, rifuData, tonoData, fukutsuData, hashimaData, kanegasakiData, namegatadata, tokigawaData, kawajimaData, kanraData };
export { minamiAlpsData, kamogawaData, touganeData };
export { kashiwaData, matsudoData, yamaguchiData };
export { takamatsuData, sagaData };
export { odawaraData, kamakuraData };
export { saijoData, nankokuData, yachiyoData, kamagayaData, zushiData, naritaData };
export { uonamaData };
export { sanukiData };
export { yotsukaidoData };
export { kikuyoData };
export { katagamiData };
export { hannoData, hashimotoData, niizaData, urayasuData, tsukubaData, kanumaData, tatebayashiData, aizuwakamatsuData, azuminoData, echizenData, kashiwazakiData };
export { narashinoData, shibukwaData, fujiokaData, muroranData, shirakwaData, sanjoData, sibataData, sojaData };
export { iwakuniData, tosuData, koshiData };
export { nodaData, sakuraData, kisarazuData, kakogawaData, sandaData };
export { shinjukuData, toshimaData };
export { setagayaData, yokohamaData, osakaData, kawasakiData, nagoyaData, saitamaData, sapporoData, kobeData, fukuokaData, hiroshimaData, sendaiData, kyotoData, kitakyushuData, hamamatsuData, chibaData, adachiData, suginamiData, itabashiData, nerimaData, otaData, edogawaData, sakaiData, niigataData, sagamiharaData, nakanoData, kitaData, arakawaData, shinagawaData, meguroData, shibuyaData, bunkyoData, taitoData, sumidaData, katsushikaData, minatoData, chuoData, chiyodaData, kotoData, okayamaData, kumamotoData, shizuokaData, machidaData, fujisawaData, toyonakaData, yokosukaData, kagoshimaData, utsunomiyaData, higashiosakaData, nishinomiyaData, amagasakiData, toyotaData, kawagoeData, kashibaData, kanazawaData, takatsukiData, koshigayaData, naraData, nagasakiData, oitaData, nahaData, akashiData, suitaData, okazakiData, ichinomiyaData, hirakataData, otsuData, asahikawaData, hakodateData, mitoData, maebashiData, takasakiData, aomoriData, moriokaData, akitaData, yamagataData, fukushimaData, koriyamaData, iwakiData, toyamaData, fukuiData, naganoData, gifuData, toyohashiData, wakayamaData, kurashikiData, fukuyamaData, kureData, shimonosekiData, matsueData, kochiData, saseboData, tottoriData, kurumeData, miyazakiData, omeData, koganeiData, kokubunjiData, tamaData, kodairaData, higashimurayamaData, nishitokyoData, mitakaData, hinoData, musashinoData, hiratsukaData, chigasakiData, yamatoData, tokorozawaData, sokaData, kasukabeData, ageoData, kumagayaData, sayamaData, misatoData, ibarakiData, yaoData, neyagawaData, kishiwadaData, moriguchiData, ikedaData, tokushimaData, tsuData, kofuData, matsumotoData, yokkaichiData, kusatsuData, ichikawaData, nagareyamaData, itamiData, kawanishiData, kasugaiData, toyokawaData, omutaData, kasugaData, tomakomaiData, obihiroData, kushiroData, ujiData, higashihiroshimaData, chofuData, fuchuData, funabashiData, hachiojiData, himejiData, kawaguchiData, matsuyamaData, nagaokaData, fujiData, hachinoheData, izumiData, irumaData, todaData, asakaData, zamaData, daitoData, matsubaraData, habikinoData, chikushinoData, kukiData, kazoData };

