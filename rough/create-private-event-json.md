## Failed

```
{
"type": "fee",
"id": "at12d5hqx4wr685deqrjqljsknv2wxuqw6yug3dvnyuuavymvj0e59sjkrr42",
"fee": {
"transition": {
"id": "au1a3jdprnczt7tru3dak3k5jul734wef5v44zwjrggm6gnpqpm9c8qhqxsx6",
"program": "credits.aleo",
"function": "fee_public",
"inputs": [
{
"type": "public",
"id": "3287475656895305336315680135600907450008966463337434040411006067886499064715field",
"value": "10000000u64"
},
{
"type": "public",
"id": "7808885877257309765377460349899785338314766869141783203615157467410012920641field",
"value": "0u64"
},
{
"type": "public",
"id": "7785633626723872615683584929146708146948758865871338323301935004843930967152field",
"value": "5216079313357279334021183780502617276237804289865571211445703950605171440791field"
}
],
"outputs": [
{
"type": "future",
"id": "6138077672904358504985685925996165678333445940431778133274501545140362305819field",
"value": "{\n  program_id: credits.aleo,\n  function_name: fee_public,\n  arguments: [\n    aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut,\n    10000000u64\n  ]\n}"
}
],
"tpk": "92148027896570022671929291277239443690891258461831067105710338673592032509group",
"tcm": "6175143973720343430552336169669910142625994904867802533952660436036131821728field"
},
"global_state_root": "sr1dq72ujp8tt7ejtnj97tlmvhqf43zvczfn057t7we5jtzc9dgzsyqs046xh",
"proof": "proof1qyqsqqqqqqqqqqqpqqqqqqqqqqqg7a7wcxmxlsrakrukqmf32uwwqaf32lzf3v0sg2tlqx4p7mmxcgw4vdmf7xxxh4xu3pe2d3gy74cpq9ppdqjstnrkw7yhse05yhrwxp8qu3y44x26d8mc96lawdxfal2k5yhappspxmfrfqgukxa9vfgygqzygupksey4hpr0zrdta5txqlsannep4tvfug7qww93af6vcv7de2wjge3l3g3gvvpjj0kqmwwyfyqx7q9se4rwd89mt69ryk99whp6rqc8cchdsvf2mrtplcxr3e5uda5jtae3w3kdew3mkhw35maqpsyqetmz4qwqun7sun9lmunttx2elfy35r2y2n4h0kh9gmvr8c0gpquzl20lmmseu6tq56afduqwjfyczq9v67n0kc472ax4sqyyru485gsgd7nr4yf7fxyvynpcljd5qwfsl4rprcd0s5dssdvrzrq3w8dkqzd04rzxg9ydqk22qe83h0ztfk90jqusyuxq22r9cxqn5865xkulw9kcnfxygyr6guwaem7gnslsnq0a2wd3qhnre78rx86z25r0q7pj242ru0rlrw9u4lyp2h6fn5qwesj0pkn8ghcscylnl7jcdvctksq9fjka0n4x2greut6n49fywl5dxtn6a55ecyaz4jj5k3dp8esk3a9mxllfurrm68xvwflmwwv79dqq7ftxvmr5xgl44gzta5qfaqcrwpnc3w8rar8js8eck7p88cakxszkuqm55g83j7d44u3zyery40qv0ntfgqa6esg6pdglrak0dn23wpvxm0q9l3djjwy5uvzarawmct0m22nyn6dmvcq4xhzpharecpuyp5jtu6gmhekcjhv697hjrsz563w9fdw2w0j6zqq34jwu7duacevqndfcqt8vv0797ueur2qwxl823j79txvva0w4ehuhk67w8rn8amgyckxe9nrkphrrulhnll9gf6pu5qw9e5f3ntwq0mhfv56l94j7vvrrjyhr702xp64ep7cmy22c33knytmgqd8m9kg6mg0fm8j9fen7spjaufcs9dmzuty89zdrets97q9s5036mjs22zg87tvyxtrtrn87qxw622pzsehzstgv8q92cz4ngr5eh4chsltc8ev8uwxfxqkzejrqdhcuy0v0q5gg70uxznq2cr7huwmgw40r2p54z0ccuf57wp4wl9cdqvqqqqqqqqqqqrwp79gg5r7hycqvwepu9wz0mjcj78dse4jagljnruyguvx2cc2lfwatlhyepv35ch0mztr33yztsyq93zktfeexnktkeklmmr58r7dy3hykr4thqaqwzyk4chhm4q2t76w7kzqzef5kdktv4ng0uru5kwqqq9nfdndl93zqkhq4nrrekzvjlmgrl8jtctdf7jhv4la9efpx62sscg2q75juk7tx976jycuh448at56axr3n07w45sqpejljeej7uee4far3qejj67twfl8dq7e0scj4qyqqms42lv"
}
}

```


## Success


```
{
  "type": "execute",
  "id": "at15ey6q4ha6fehw9lqk6mj37yesclqazd2gwmznztmsc5uhktm4sqsstfqr3",
  "execution": {
    "transitions": [
      {
        "id": "au1vkkm74rqhr7avgqdyv7k4s5azs7j5d4hsw8ge4twwj7kuv5e2srs6nwfa7",
        "program": "iknowspots_2.aleo",
        "function": "create_public_event",
        "inputs": [
          {
            "type": "private",
            "id": "5981641618009428322164476297478217168810855871577310049481382750242099649917field",
            "value": "ciphertext1qgqta59d6a6l0xxfs3924zds5f9y7273wfwsmumwgv7chn9vt5jt6z7pcxd2rh32y3nvf6l5c7fm9mw8w2a8gckqwf2expham8yj88qeqgrt5gtt"
          },
          {
            "type": "private",
            "id": "5169771009439882582908382036692514655608734491330813097364924821212028726156field",
            "value": "ciphertext1qyqr9pww2gzc5accn6m7aswjmgglzmsh07msxljc8t6d53m0r6vnjqg36yxfn"
          },
          {
            "type": "private",
            "id": "7172623311349735169504462094439012008866754789639869912444939201898294213975field",
            "value": "ciphertext1qgqw6l4zzjtcm7wd8e8n45sveq9n0ux4nmm5d944ckez7t0kjl7uqp4ywrasszaae7n53kdllqprrqadq43ylt4qdrp5hc0kfl2f40wszyaz2uch"
          }
        ],
        "outputs": [
          {
            "type": "private",
            "id": "8176963187112323992840948402973722693629392753802343353201842168449694582712field",
            "value": "ciphertext1qyq2q4r7hfwwl9puplvzzg5fujlec445f4kvqdhcelxwz2lcxkmwgps90v59e"
          },
          {
            "type": "future",
            "id": "8097028422227593322744866897820888589619912933442704300820038255958272936954field",
            "value": "{\n  program_id: iknowspots_2.aleo,\n  function_name: create_public_event,\n  arguments: [\n    {\n  is_private: false,\n  event_owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut,\n  event_id: 6226467742741708868213437676395202022243488973553218974646366829275252465470field,\n  status: 1u8,\n  max_supply: 600u32,\n  claim_code_hash: 3611833665682390417726657083118329332328962452006666180651356013125797364479field\n}\n  ]\n}"
          }
        ],
        "tpk": "4719774828851014647433862076094268235879898614897666497657060167638195338377group",
        "tcm": "7173520709031817359337242933814525342124467944368224644103783376373313265418field"
      }
    ],
    "global_state_root": "sr1vdk24eyan9p7rqg92uejkjp0hpvxlarwqrffpvd6hhtswpewqyrqa85npx",
    "proof": "proof1qyqsqqqqqqqqqqqpqqqqqqqqqqqxm3uwc879a7n9zsmfydtt764t9enuh09fh3qjsl8msdtpz8jzew2t6vhpexs9rxryrnctg9qa5rsqq87p9uu3kw4ey2ctrgwg28ykfzm64urvknvh984la9dey4xwaaak74neax2xcz8u4cllwyxd9quxhqf5acmqz3qfglwrffaqsvlhljr6h6nxu9klg7kz52p95gdx9vjzjwq98jhrxg34pfl9s0xz0jffv2qcj77ghxce3kawakv5hqarcyqlglhaxfzsnkn6rzx6rpgtuyzq89n4ltrashnmyewhpt868t3nk6uqeugkymc78ekgdqpctua0y54rq5ehxefhqgn46hc3cpfjk0tqss457vl3khx0wd86kd6lhu6fz4lsr5839x2d7w60ftyzjq0cay2wsrgwp3vjwp09tsfzqnnantllc4sxcpsg54jpjztkvwaus82fyvmvqrp58wetfch38deq7styv9yqectwakrkt9rfqas8k6zdfwtzvpktwyevh3pq8hg9e9sum3uplncrcqq77q85t5826sgrzlntyjkfmss20s7vgfgflyf5gg7dkyhaglylwkn0eqs0j5ww4q26ldu9ckpn6uq982xh53tx93mrlvm76skmxgkeg2hau6x3kan6k59auxrp4r5fnpcymjz24nnc58ypgqrya226ltypjf0clhksxevxyjjy8gmrwh337wae4l54e7yh2xda2nh2zddcyuzwqqymr63wgf9rcu4pjednvylujk5du3aykeuwje4ew9tgt0y0czyvgmyh75gr68p7kzr755a6e7fvuhw799xlhaqptf84mtue5lmdp8geawef63ynf2k62u46qgyg5kjfqrqya2hf72e75unuhxmemzc3zxaywljd32h0k3hua4jkgw9p9xp6gs6ysvyqx4jaznpnvjjnn3cdxlmzqvck02c9pgaye8lz4ur0cflnc26hvkhgc0j6s94j7akazvqguf9m9g5cqpwyarwhjegu5r5x32v7vu8u5kcw0h49qg832y7msq3qguuwthydg9cd3x2r0htp7rzgxhfq3fq7tdqh2a09846ctjtmzxcr6f58saz890cdff300t6s2z79lck4wqgrvz9cfzn3uy3mms8qwwt0p0fspr0qfnxjy5w5ztptsm8sjekud5t48qxgdn30rdcdy0cfqvqqqqqqqqqqpw9cqyg2uekafc98uztm3dt4ethugtk3x6xgaykxus3qvuprh96d9tk3p7g5dyk8kzjshun6zj8kqqq2xt4hfly4sj3uhhj7gp0s306rlhevg2tegm8xutst0t8c7qyrw8r5zf6r7j93pagh2q9xmwv37jcpqyk4lhh7g8zwquhxhj66pv00veweajcq3z44qjaffhrxj9y8mxmqvmxjjlesqk8fud3uhvtqu3j29vk30c29dr26kgspj39q9w9lv4r4yw6fd920zl0sdr9agzdy5qegsyqq57ywcj"
  },
  "fee": {
    "transition": {
      "id": "au1m66lej20rqmunw29yqayx6qs0qcwh4slqfwml7l5l86sxekpk58shhr9qh",
      "program": "credits.aleo",
      "function": "fee_public",
      "inputs": [
        {
          "type": "public",
          "id": "3163280142487414839366971911705555710134615542306941520613958970226264164651field",
          "value": "10000000u64"
        },
        {
          "type": "public",
          "id": "4923001111159230856950496750417959219798579905950922142755733518726911522229field",
          "value": "0u64"
        },
        {
          "type": "public",
          "id": "7434251170100805233879914376428792088237485759548667746224115754926897790362field",
          "value": "7421079002451960225238448743377638940449946144497138340689892398871759962972field"
        }
      ],
      "outputs": [
        {
          "type": "future",
          "id": "5404262516985882575303846716020051563880707085584944679976803270358906324876field",
          "value": "{\n  program_id: credits.aleo,\n  function_name: fee_public,\n  arguments: [\n    aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut,\n    10000000u64\n  ]\n}"
        }
      ],
      "tpk": "1367033167714335851748879043210021964020672721657248916511251432861109798623group",
      "tcm": "6518481561743865753351331841839042968819601840759818379193140499731875421828field"
    },
    "global_state_root": "sr1sqpmjkf3zq35vx9dlhrz0sqa547jjwrgzn57zt0vpachscr9eq9s6lfgsp",
    "proof": "proof1qyqsqqqqqqqqqqqpqqqqqqqqqqqvxx3cxy0jdqexfj038ute384jx2stk0r8ekp95gqjndmdjs2qpgn5ppx7y64kxefyejvmdlluwrcpq9597pygjlzmseqtzd5hjcdutn5w6ytan6yums269c4cemm9x4z4j5y6spzjdhcqk3pzxcezraxp6qqmcsp2dl7mdvdagxvcyc5jgyn9lr8pu3nc7pzmv29mtfy3egnk4s0hac9vrx3jp9yjchdytssxcgqwhr9psqe707p3gfp079k5mh76cfxhxmepzl77pzwsdvpv67mx6k754h3a53jkyehknuv3tlw06dqpwapp6rkt5h50k0jdkfahmsdqkydzp4jnmhf7gttdynxnxvsj8kes4udy7herv909r0l03r6dggacpn7vk3umtqf4zt267x3xrd2v7ely45sdc8pt64v9wkr92r3x9sh8qqgc9s3ht8pvjg204m4j4ux8qpwurt2e8qpmt6l8zwuuqmn82myllen8dlmnvytxgljwav55vpjnpslchjg6mlxflqtscmdjev9kxqpm2j5ngswna45atvy3amsj0zsdm582yzve0nlp8v5x26j54x3e4dhajcqsxs24w2ynmwfau74ljwqyrqjgxzq4y60crnppcy9qryx0a9c0t8yum7k99w2dt52vsafm7qy8697g48l7fcrk4fq6fkdk5ncp8ekcfhf0vahk2a8pt8dqfvkdlzw94vas3ze9pqhzhs4j4hn665gzhns485mdtg0s9asq7rv9fy4euqprpy9elqq7fzckmvsukjq4wp0z5dqdaf4phplkz4492444navmqf6nwtaplx88v0mzt608u4deptz3ykalmpf9f6vgv2dm7r0hs4jraldf5nw3hc48rqwnnkece33qrcjjgksncjk7rqjh6h2c66pa7akxzd879wksy3ka06gm3r9vcvqx0s8gvn3h0gy35k559u25kfmy25j9tmmetfsqf9zssfg3mprd6upac85tugm4pkhjfkmuawdfl729hwts22pzsnurg4k03r29cntfvpf20nycg20fld7g0plh5k920vpst268yl3968wfvrr9n6d9gl6xq97rk6y5m9sc0d963t29ayhc9q3jhslqytx88nq78k3vp6jkc4msp8yk0aq8exfy59kyaf0a08ataw47t98kmwgg47mla98lclga2esxqvqqqqqqqqqqqz7al6p6cadz705xz325gwwe9wqyj7lv5yz773mmr4vhj8anwkndn3vdfmupcsp2lgfjrldjnnptsyqy70wjppx26yt9hl9q6f69vz82xy64l298z6mdgzvge5qt7f2n44e53mx3g6wttrvmtynynqs5mqupq9kqz4u6r8mj40h6s62dhtwav2fcvqgmcwf3trrwa300pj65dhrs88fwn9jgt4vjgkd7ef9xshq600xc3gv5dz5t5p689jpuur538u85kxg92mx45egfhmv2vx929vvvsyqqhshlr0"
  }
}

```
