
// Node
APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH
AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw
aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px


// From : Senior Developer
APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc
AViewKey1mzaT1mopkL7TnVxUr6yhmF7AyXPm8DCNk1tkHEEk7Zso
aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut


// to : Junior Senior Developer
APrivateKey1zkpFBBxRuE3x54adVVPParNK9JwTrz1m6qigmRbCyT5QWQg
AViewKey1cnXTuzE67C68BQ6XuFpcRpY9SphaNKvxCTkUoebtEm1T
aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9


// Extra Accounts 1
APrivateKey1zkpCTViTg5XWbC1cRHoJGt3HE91yd8T1PSNBneMNsfADbgt
AViewKey1jnWyws14NsCDPCufSJe22BkxevNJ6uYwTRZG8zbqKLsq
aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c


// Extra Accounts 2
APrivateKey1zkp2YKfcXNJM3rJ6AsZTEX7JAYGCXRZr4X6npvGQvVuPXSq
AViewKey1sBS6xBjA14qdkmZgs9EZSVjKCTxufGTGtmegiF45qhHZ
aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp


// Extra Accounts 3
APrivateKey1zkpCekDSPDaHbKVyjS5PWo6mh1JTGjbhck9YyhYey6u7zYq
AViewKey1ueDfVSPEM2hSBcSftKx251We9UQ6UosGujyxktNqjsY4
aleo1xykf5gvr0sjw94hzey6zc6wec9zldwa09zy5rdlrkxlus8hr659qkfwvz6


------


// Node Blocks in case of credit crunch
snarkos developer scan -v AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw --start 0 --endpoint "http://localhost:3030"

// Scan for Senior developer records
snarkos developer scan --private-key APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc --last 2000 --endpoint "http://localhost:3030"


snarkos developer execute credits.aleo transfer_private "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 1000000000000u64.private,  _nonce: 7167548570416370992660419783534955522916027654549387115860521522018029780145group.public}" "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut" 1000000000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 989999870891u64.private,  _nonce: 3059230408599232032041614024525325251901362467354990975349519777410601846890group.public}"


snarkos developer execute credits.aleo transfer_private "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 1000000000000u64.private,  _nonce: 6429435772147272815911423722545141230795407962075161002383518367393673642743group.public}" "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut" 1000000000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 1000000000000u64.private,  _nonce: 1870384227717108990812464071079401090030090200169646008180314689517851502548group.public}"


// Aleo Credit transfer from node to address
snarkos developer execute credits.aleo transfer_private_to_public "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 1000000000000u64.private,  _nonce: 2147544859188173635598614390014841094843475220987598413361363655799329122784group.public}" "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut"  1000000000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 1000000000000u64.private,  _nonce: 1870384227717108990812464071079401090030090200169646008180314689517851502548group.public}"


snarkos developer execute credits.aleo transfer_private_to_public "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 1000000000000u64.private,  _nonce: 2147544859188173635598614390014841094843475220987598413361363655799329122784group.public}" "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut"  1000000000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 989999997790u64.private,  _nonce: 2883426532247556633507618116518785807531646371697843641113276623127891094822group.public}"



snarkos developer execute credits.aleo transfer_private_to_public "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 93750000000000u64.private,  _nonce: 239342958985106763708738609678182549854111744243820417353521050114416207606group.public}" "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut" 837500000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 93750000000000u64.private,  _nonce: 6943652577720031695852320528779080923424298438422299389212028025252409913592group.public}"



snarkos developer execute credits.aleo transfer_private_to_public "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 93750000000000u64.private,  _nonce: 239342958985106763708738609678182549854111744243820417353521050114416207606group.public}" "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut" 837500000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 93750000000000u64.private,  _nonce: 6943652577720031695852320528779080923424298438422299389212028025252409913592group.public}"



// Deploy
snarkos developer deploy iknowspots_2.aleo --private-key APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc --query "http://localhost:3030" --path "./build/" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 600000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 837479731000u64.private,  _nonce: 4292393654384711680071256063834865910129031443496172025756230662500356227836group.public}"


snarkos developer deploy iknowspots_2.aleo --private-key APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc --query "http://localhost:3030" --path "./build/" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 600000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 1000000000000u64.private,  _nonce: 7999209595059648632327881890849083406811801987376841841523850240790997637598group.public}"





snarkos developer deploy iknowspots_2.aleo --private-key APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc --query "http://localhost:3030" --path "./build/" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 600000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 817489810275u64.private,  _nonce: 725948641250041373053689787761889798567424984853305573247763705387838303239group.public}"







snarkos developer deploy iknowspots_2.aleo --private-key APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc --query "http://localhost:3030" --path "./build/" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 600000 --record




// Aleo Credit transfer from node to address
snarkos developer execute iknowspots_2.aleo create_private_event "1field" "101u32" --private-key "APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 600000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 837489851000u64.private,  _nonce: 4505902132629679853296356180315884374675633677224647631284890455619150414860group.public}"





snarkos developer execute iknowspots_2.aleo create_private_event "2field" "102u32" --private-key "APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 600000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 817479754275u64.private,  _nonce: 1705475877813625548728830374195790424044069980420485320949867007637878879238group.public}"




snarkos developer execute iknowspots_2.aleo toggle_private_event "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  event_id: 3736522601382494394255789052466017870786031735005680174691203879959757105441field.private,  status: 1u8.private,  max_supply: 102u32.private,  shortlisted: {    addr0: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,    addr1: aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9.private,    addr2: aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c.private,    addr3: aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp.private  },  _nonce: 7187251833938982369885205570439370405696502455713593874084549037676655737296group.public}" "0u8" --private-key "APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 600000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 807479633814u64.private,  _nonce: 2780360909126258977261440195856246274234480778403762833825632996397079862546group.public}"


snarkos developer execute iknowspots_2.aleo claim_private_event "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  event_id: 3736522601382494394255789052466017870786031735005680174691203879959757105441field.private,  max_supply: 102u32.private,  _nonce: 7336487711873377956033941404218527952709512078935279049684427656637320808168group.public}"  --private-key "APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 797479027921u64.private,  _nonce: 7057998599530301525402841361860453684636326207190325559689348368880898548054group.public}"



snarkos developer execute iknowspots_2.aleo create_public_event "3field" "103u32" "1003field"  --private-key "APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 787479025979u64.private,  _nonce: 359181505848521813513035027413087895613633411579964794871369675906482460365group.public}"




snarkos developer execute iknowspots_2.aleo toggle_public_event "3784389418964719981816894781287115017553786961964078707004764868992997308403field" "0u8"  --private-key "APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 777478807738u64.private,  _nonce: 1977301150367491750488040275913491619683456699390552361497153295661986763252group.public}"



// WRONG - Passed because I didn't put the claim_hash_code match condition

snarkos developer execute iknowspots_2.aleo claim_public_event "3784389418964719981816894781287115017553786961964078707004764868992997308403field" "1004field"  --private-key "APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 767478658717u64.private,  _nonce: 4044481921650605443316059243981448659617059632284182693482271277242134493830group.public}"




------



// Node credits search
snarkos developer scan -v AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw --start 0 --endpoint "http://localhost:3030"

// Scan for Senior developer records
 snarkos developer scan --private-key APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc --last 1000 --endpoint "http://localhost:3030"

// Scan for Junior Senior developer records
 snarkos developer scan --view-key AViewKey1cnXTuzE67C68BQ6XuFpcRpY9SphaNKvxCTkUoebtEm1T --private-key APrivateKey1zkpFBBxRuE3x54adVVPParNK9JwTrz1m6qigmRbCyT5QWQg --last 100 --endpoint "http://localhost:3030"


 ------



snarkos developer deploy iknowspots_2.aleo --private-key APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc --query "http://localhost:3030" --path "./iknowspots/build/" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 600000 --record "{  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,  microcredits: 837490921000u64.private,  _nonce: 1739902003959519510250491500627565449878277321904130176316531435176376624350group.public}"



------


iknowspots
--------------



decrypted record {
  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,
  event_id: 1134u32.private,
  status: 1u32.private,
  max_supply: 10067u32.private,
  shortlisted: {
    a0: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,
    a1: aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9.private,
    a2: aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c.private,
    a3: aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp.private
  },
  _nonce: 2461753092308160922333872858503198375127371373900510869190964422982482192440group.public
}




-----


    let updatedShortlistAddressStruct: AddressStruct = AddressStruct{
        addr0: updatedShortlistAddresses.addr0,
        addr1: updatedShortlistAddresses.addr1,
        addr2: updatedShortlistAddresses.addr2,
        addr3: updatedShortlistAddresses.addr3
    };

    let eventPass0 : EventPass = EventPass{
        owner:updatedShortlistAddresses.addr0,
        event_id:event.event_id,
        max_supply:event.max_supply
    };
    let eventPass1 : EventPass = EventPass{
        owner:updatedShortlistAddresses.addr1,
        event_id:event.event_id,
        max_supply:event.max_supply
    };
    let eventPass2 : EventPass = EventPass{
        owner:updatedShortlistAddresses.addr2,
        event_id:event.event_id,
        max_supply:event.max_supply
    };
    let eventPass3 : EventPass = EventPass{
        owner:updatedShortlistAddresses.addr3,
        event_id:event.event_id,
        max_supply:event.max_supply
    };

-------------



// The 'iknowspots_2' program.
program iknowspots_2.aleo {

    // mapping eventOwnerMapping: field => address;

    struct AddressStruct{
        addr0:address,
        addr1:address,
        addr2:address,
        addr3:address
    }
    record Event{
        owner: address,
        event_id:u32,
        status:u32,
        max_supply: u32,
        shortlisted: AddressStruct
    }

    record NFT{
        owner:address,
        event_id: u32,
    }

    record EventPass{
        owner: address,
        event_id: u32,
        max_supply:u32
    }

    record EventNFT{
        owner: address,
        event_id: u32,
        max_supply:u32
    }

    // This eventID will be the hash of the eventName and will be converted to eventId
    transition create_event(eventID: u32,maxSupply:u32)-> Event{
        let defaultShortlistedAddresses: AddressStruct = AddressStruct{
            addr0: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut,
            addr1: aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9,
            addr2: aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c,
            addr3: aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp
        };

        return Event{
            owner:self.caller,
            event_id:eventID,
            status: 1u32,
            max_supply:maxSupply,
            shortlisted: defaultShortlistedAddresses
        };
    }

    // 0u32 -> turned off
    // 1u32 -> turned on
    // 2u32 -> completed - won't be able to toggle after that
    transition toggle_event(event: Event,toggleValue:u32) -> Event{
        assert_eq(event.owner,self.caller);
        assert_neq(event.status,2u32);
        return Event{
            owner:event.owner,
            event_id:event.event_id,
            status: toggleValue,
            max_supply:event.max_supply,
            shortlisted: event.shortlisted
        };
    }

    // for now, we are supporting only 4 address as array is not available in leo
    // when arrays support will be provided by leo - implementation will add some customised capacity
    transition add_whitelisted_address(event: Event,addressAsStruct: AddressStruct)->Event {
        assert_eq(event.owner,self.caller);
        assert_neq(event.status,2u32);
        // let burn_address: address = aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;
        // assert_neq(addressAsStruct.a0,burn_address);
        // assert_neq(addressAsStruct.a1,burn_address);
        // assert_neq(addressAsStruct.a2,burn_address);
        // assert_neq(addressAsStruct.a3,burn_address);
        return Event{
            owner:event.owner,
            event_id:event.event_id,
            status:event.status,
            max_supply:event.max_supply,
            shortlisted: addressAsStruct
        };
    }
    // addr0: address,addr1: address,addr2: address,addr3: address
    transition set_shortlist(event: Event, updatedShortlistAddresses: AddressStruct ) -> (Event, EventPass,EventPass,EventPass,EventPass){
        assert_neq(updatedShortlistAddresses.addr0,updatedShortlistAddresses.addr1);
        assert_neq(updatedShortlistAddresses.addr0,updatedShortlistAddresses.addr2);
        assert_neq(updatedShortlistAddresses.addr0,updatedShortlistAddresses.addr3);
        assert_neq(updatedShortlistAddresses.addr1,updatedShortlistAddresses.addr2);
        assert_neq(updatedShortlistAddresses.addr1,updatedShortlistAddresses.addr3);
        assert_neq(updatedShortlistAddresses.addr2,updatedShortlistAddresses.addr3);
        assert_eq(self.caller,event.owner);

        let updatedShortlistAddressStruct: AddressStruct = AddressStruct{
            addr0: updatedShortlistAddresses.addr0,
            addr1: updatedShortlistAddresses.addr1,
            addr2: updatedShortlistAddresses.addr2,
            addr3: updatedShortlistAddresses.addr3
        };
        let updatedEventCreationRecord : Event = Event{
            owner: event.owner,
            event_id:event.event_id,
            status:event.status,
            max_supply: event.max_supply,
            shortlisted: updatedShortlistAddressStruct
        };

        let eventPass0 : EventPass = EventPass{
            owner:updatedShortlistAddresses.addr0,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let eventPass1 : EventPass = EventPass{
            owner:updatedShortlistAddresses.addr1,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let eventPass2 : EventPass = EventPass{
            owner:updatedShortlistAddresses.addr2,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let eventPass3 : EventPass = EventPass{
            owner:updatedShortlistAddresses.addr3,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        return (updatedEventCreationRecord, eventPass0,eventPass1,eventPass2,eventPass3);
    }

    transition claim_event(eventPass: EventPass)-> EventNFT{
        // How would I know that the eventPass record is from the specific program.
        // Anyone can have that record from some other program

        // RESEARCH: For now, I am just assuming that there is a mechanism in place that checks
            // Reason for the assumption - in the "Token" example - they are not checking anything
        // whether the record is from the program where we are using it in
        return EventNFT {
            owner: self.caller,
            event_id: eventPass.event_id,
            max_supply:eventPass.max_supply
        };
    }


}


-----


let updatedShortlistAddressStruct: AddressStruct = AddressStruct{
	addr0: addr0,
	addr1: addr1,
	addr2: addr2,
	addr3: addr3
};

    let eventPass0 : EventPass = EventPass{
        owner:updatedShortlistAddresses.addr0,
        event_id:event.event_id,
        max_supply:event.max_supply
    };
    let eventPass1 : EventPass = EventPass{
        owner:updatedShortlistAddresses.addr1,
        event_id:event.event_id,
        max_supply:event.max_supply
    };
    let eventPass2 : EventPass = EventPass{
        owner:updatedShortlistAddresses.addr2,
        event_id:event.event_id,
        max_supply:event.max_supply
    };
    let eventPass3 : EventPass = EventPass{
        owner:updatedShortlistAddresses.addr3,
        event_id:event.event_id,
        max_supply:event.max_supply
    };


----------

transition set_shortlist(event: Event, addr0: address,addr1: address,addr2: address,addr3: address) -> (Event, EventPass,EventPass,EventPass,EventPass){
	assert_neq(addr0,addr1);
	assert_neq(addr0,addr2 );
	assert_neq(addr0,addr3);
	assert_neq(addr1,addr2 );
	assert_neq(addr1,addr3);
	assert_neq(addr2,addr3 );
	assert_eq(self.caller,event.owner);

	let updatedShortlistAddressStruct: AddressStruct = AddressStruct{
		addr0: addr0,
		addr1: addr1,
		addr2: addr2,
		addr3: addr3
	};

	let eventPass0 : EventPass = EventPass{
		owner:addr0,
		event_id:event.event_id,
		max_supply:event.max_supply
	};
	let eventPass1 : EventPass = EventPass{
		owner:addr1,
		event_id:event.event_id,
		max_supply:event.max_supply
	};
	let eventPass2 : EventPass = EventPass{
		owner:addr2,
		event_id:event.event_id,
		max_supply:event.max_supply
	};
	let eventPass3 : EventPass = EventPass{
		owner:addr3,
		event_id:event.event_id,
		max_supply:event.max_supply
	};
	let updatedEventCreationRecord: Event = Event{
		owner:event.owner,
		event_id:event.event_id,
		status: event.status,
		max_supply:event.max_supply,
		shortlisted: updatedShortlistAddressStruct
	};
	return (updatedEventCreationRecord, eventPass0,eventPass1,eventPass2,eventPass3);
}



----------------------




// Node
APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH
AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw
aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px


// From : Senior Developer
APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc
AViewKey1mzaT1mopkL7TnVxUr6yhmF7AyXPm8DCNk1tkHEEk7Zso
aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut


// to : Junior Senior Developer
APrivateKey1zkpFBBxRuE3x54adVVPParNK9JwTrz1m6qigmRbCyT5QWQg
AViewKey1cnXTuzE67C68BQ6XuFpcRpY9SphaNKvxCTkUoebtEm1T
aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9


// Extra Accounts 1
APrivateKey1zkpCTViTg5XWbC1cRHoJGt3HE91yd8T1PSNBneMNsfADbgt
AViewKey1jnWyws14NsCDPCufSJe22BkxevNJ6uYwTRZG8zbqKLsq
aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c


// Extra Accounts 2
APrivateKey1zkp2YKfcXNJM3rJ6AsZTEX7JAYGCXRZr4X6npvGQvVuPXSq
AViewKey1sBS6xBjA14qdkmZgs9EZSVjKCTxufGTGtmegiF45qhHZ
aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp


// Extra Accounts 3
APrivateKey1zkpCekDSPDaHbKVyjS5PWo6mh1JTGjbhck9YyhYey6u7zYq
AViewKey1ueDfVSPEM2hSBcSftKx251We9UQ6UosGujyxktNqjsY4
aleo1xykf5gvr0sjw94hzey6zc6wec9zldwa09zy5rdlrkxlus8hr659qkfwvz6


------


// Node Blocks in case of credit crunch
snarkos developer scan -v AViewKey1mSnpFFC8Mj4fXbK5YiWgZ3mjiV8CxA79bYNa8ymUpTrw --start 0 --endpoint "http://localhost:3030"


// Scan for Senior developer records
snarkos developer scan --private-key APrivateKey1zkpHVhTAJiZPrDeVo6nDyvq2LDRhP2ZgECvr8zqtcefpgsc --last 1000 --endpoint "http://localhost:3030"




// Scan for Junior developer records
snarkos developer scan --private-key APrivateKey1zkpFBBxRuE3x54adVVPParNK9JwTrz1m6qigmRbCyT5QWQg --last 1000 --endpoint "http://localhost:3030"


// Credits transfer to Junior developer
snarkos developer execute credits.aleo transfer_private  "aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9" 837500000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record




// Scan for 1st developer records
snarkos developer scan --private-key APrivateKey1zkpCTViTg5XWbC1cRHoJGt3HE91yd8T1PSNBneMNsfADbgt --last 100 --endpoint "http://localhost:3030"


// Credits transfer to 1st developer
snarkos developer execute credits.aleo transfer_private  "aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c" 837500000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record



// Scan for 2nd developer records
snarkos developer scan --private-key APrivateKey1zkp2YKfcXNJM3rJ6AsZTEX7JAYGCXRZr4X6npvGQvVuPXSq --last 100 --endpoint "http://localhost:3030"


// Credits transfer to 2nd developer
snarkos developer execute credits.aleo transfer_private  "aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp" 837500000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record



// Scan for 3rd developer records
snarkos developer scan --private-key APrivateKey1zkpCekDSPDaHbKVyjS5PWo6mh1JTGjbhck9YyhYey6u7zYq --last 100 --endpoint "http://localhost:3030"



// Credits transfer to 3rd developer
snarkos developer execute credits.aleo transfer_private  "aleo1xykf5gvr0sjw94hzey6zc6wec9zldwa09zy5rdlrkxlus8hr659qkfwvz6" 837500000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record



------



{
  owner: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,
  event_id: 11u32.private,
  status: 1u32.private,
  max_supply: 111u32.private,
  shortlisted: {
    addr0: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut.private,
    addr1: aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9.private,
    addr2: aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c.private,
    addr3: aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp.private
  },
  _nonce: 6824693696704378489474296855031414529416577986306679321674021009829907431876group.public
}



-----

## Things to note from looking at multiple leo repositories

### From arcane_rfq_amm_v000001
- Try to make most out of the type `field` in aleo while using it as a replacement for integers
    - RESEARCH? - When should we prefer `field` over `u32`
- Use hash of id's rather than just using id as a plain
- I can use inline function to reuse the code which only needs computation
- put as many asserts as you can
- Prefer Using ternary operator over `if-else`
- This is how you check before inserting the value in the key corresponding to the key in a mapping
    ```rust
        assert(!Mapping::contains(amm_deposits, deposit_key));
        Mapping::set(amm_deposits, deposit_key, lp);
    ```
-


## Rough

```
// How would I know that the eventPass record is from the specific program.
        // Anyone can have that record from some other program

        // RESEARCH: For now, I am just assuming that there is a mechanism (using nonce value) in place that checks
        // whether the record is from the program where we are using it in
            // Reason for the assumption - in the "Token" example - they are not checking anything

```


---------


```
// The 'iknowspots_2' program.
program iknowspots_2.aleo {

    // mapping eventOwnerMapping: field => address;
    struct AddressStruct{
        addr0:address,
        addr1:address,
        addr2:address,
        addr3:address
    }

    // for private
    record Event{
        owner: address,
        event_id:field,
        status:u8,
        max_supply: u32,
        shortlisted: AddressStruct
    }

    // for public
    struct EventStruct{
        is_private: bool,
        event_owner: address,
        event_id: field,
        status: u8,
        max_supply: u32,
        claim_code_hash: field,
    }

    record NFT{
        owner:address,
        event_id: field,
    }

    record EventPass{
        owner: address,
        event_id: field,
        max_supply:u32
    }

    record EventNFT{
        owner: address,
        event_id: field,
        max_supply:u32
    }

    mapping event_id_hash_to_event_struct : field => EventStruct;
    mapping event_id_hash_to_claim_count : field => u32;
    mapping hoho_event_plus_id_self_caller : address => bool;

    function hash_of_two_into_address(event_id_hash: field, caller_public_key: address ) -> address{
        let caller_public_key_in_field :  field = caller_public_key as field;
        let hash_of_event_id_hash_and_owner_public_address_hash : address = BHP256::hash_to_address(event_id_hash + caller_public_key_in_field);
        return hash_of_event_id_hash_and_owner_public_address_hash;
    }

    // This eventID will be the hash of the eventName and will be converted to eventId
    transition create_private_event(event_id: field,max_supply:u32)-> Event{
        let defaultShortlistedAddresses: AddressStruct = AddressStruct{
            addr0: aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut,
            addr1: aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9,
            addr2: aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c,
            addr3: aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp
        };
        let event_id_hash : field = BHP256::hash_to_field(event_id);
        let hash_of_event_id_hash_and_owner_public_address_hash : address = hash_of_two_into_address(event_id_hash, self.caller);
        return Event{
            owner:self.caller,
            event_id:event_id_hash,
            status: 1u8,
            max_supply:max_supply,
            shortlisted: defaultShortlistedAddresses
        }then finalize(event_id_hash,hash_of_event_id_hash_and_owner_public_address_hash);
    }

    finalize create_private_event (event_id_hash: field,hash_of_event_id_hash_and_owner_public_address_hash: address) {
        // Creation of events only if the event doesn't exists already
        // If assert fails then transition will revert as well
        // We won't count claim number for the private events
        assert(!Mapping::contains(event_id_hash_to_event_struct,event_id_hash));
        let private_event_struct : EventStruct = EventStruct{
            is_private:true,
            event_owner: hash_of_event_id_hash_and_owner_public_address_hash, // Need to check again - what should I enter
            event_id: event_id_hash,
            status: 3u8, // Private event's status shouldn't be visible,
            max_supply: 0u32, // Private event's max_supply won't be revealed
            claim_code_hash: 0field  // keeping both the max_supply and claim_code_hash same in case of private_events
        };
        Mapping::set(event_id_hash_to_event_struct,event_id_hash,private_event_struct);
    }

    transition create_public_event(event_id: field,max_supply:u32, claim_code : field)->bool{
        let event_id_hash : field = BHP256::hash_to_field(event_id);

        let claim_code_hash : field = BHP256::hash_to_field(claim_code);
        let event_id_hash_to_event : EventStruct = EventStruct {
            is_private:false,
            event_owner: self.caller,
            event_id: event_id_hash,
            status: 1u8,
            max_supply: max_supply,
            claim_code_hash: claim_code_hash
        };
        return true then finalize(event_id_hash_to_event);
    }

    finalize create_public_event(public_event: EventStruct){
        assert(!Mapping::contains(event_id_hash_to_event_struct, public_event.event_id));
        Mapping::set(event_id_hash_to_event_struct, public_event.event_id, public_event);
        Mapping::set(event_id_hash_to_claim_count,public_event.event_id,0u32);
    }

    // 0u32 -> turned off
    // 1u32 -> turned on
    // 2u32 -> completed - won't be able to toggle after that
    transition toggle_private_event(event: Event,toggle_value:u8) -> (Event, EventPass,EventPass,EventPass,EventPass){
        assert_eq(event.owner,self.caller);
        assert(event.status<2u8);
        let addr0: address = event.shortlisted.addr0;
        let addr1: address = event.shortlisted.addr1;
        let addr2: address = event.shortlisted.addr2;
        let addr3: address = event.shortlisted.addr3;

        let event_pass_0 : EventPass = EventPass{
            owner:addr0,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let event_pass_1 : EventPass = EventPass{
            owner:addr1,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let event_pass_2 : EventPass = EventPass{
            owner:addr2,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let event_pass_3 : EventPass = EventPass{
            owner:addr3,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let updated_event_creation_record: Event = Event{
            owner:event.owner,
            event_id:event.event_id,
            status: toggle_value,
            max_supply:event.max_supply,
            shortlisted: event.shortlisted
        };
        // assert_neq(event.status,2u8);

        return (updated_event_creation_record,event_pass_0,event_pass_1,event_pass_2,event_pass_3);
    }

    transition toggle_public_event(event_id_hash: field,toggle_value: u8)-> bool{
        let caller_public_key : address = self.caller;
        return true then finalize(event_id_hash,toggle_value,caller_public_key);
    }

    finalize toggle_public_event(event_id_hash: field,toggle_value : u8,caller_public_key: address){
        // TODO : Need to check how to catch the error at frontend
        assert(Mapping::contains(event_id_hash_to_event_struct, event_id_hash));
        let value_stored : EventStruct = Mapping::get(event_id_hash_to_event_struct,event_id_hash);
        let status_value_stored : u8 = value_stored.status;

        // Make sure no completed event can be toggled
        assert(status_value_stored<2u8);
        assert_eq(value_stored.event_owner,caller_public_key);
        let updatedStruct: EventStruct = EventStruct{
            is_private:false,
            event_owner: value_stored.event_owner,
            event_id: value_stored.event_id,
            status: toggle_value,
            max_supply: value_stored.max_supply,
            claim_code_hash: value_stored.claim_code_hash
        };
        Mapping::set(event_id_hash_to_event_struct,event_id_hash,updatedStruct);
    }

    // only for private functions
    // for public functions we have claim_code
    transition set_shortlist(event: Event, addr0: address,addr1: address,addr2: address,addr3: address) -> (Event, EventPass,EventPass,EventPass,EventPass){
        assert_neq(addr0,addr1);
        assert_neq(addr0,addr2 );
        assert_neq(addr0,addr3);
        assert_neq(addr1,addr2 );
        assert_neq(addr1,addr3);
        assert_neq(addr2,addr3 );
        assert_eq(self.signer,event.owner);

        let updated_shortlist_address_struct: AddressStruct = AddressStruct{
            addr0: addr0,
            addr1: addr1,
            addr2: addr2,
            addr3: addr3
        };

        let event_pass_0 : EventPass = EventPass{
            owner:addr0,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let event_pass_1 : EventPass = EventPass{
            owner:addr1,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let event_pass_2 : EventPass = EventPass{
            owner:addr2,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let event_pass_3 : EventPass = EventPass{
            owner:addr3,
            event_id:event.event_id,
            max_supply:event.max_supply
        };
        let updated_event_creation_record: Event = Event{
            owner:event.owner,
            event_id:event.event_id,
            status: event.status,
            max_supply:event.max_supply,
            shortlisted: updated_shortlist_address_struct
        };
        return (updated_event_creation_record, event_pass_0,event_pass_1,event_pass_2,event_pass_3);
    }

    transition claim_private_event(event_pass: EventPass)-> EventNFT{
        // assert();
        // TODO: Allow if the event status is active.
        assert_eq(event_pass.owner,self.caller);

        return EventNFT {
            owner: self.caller,
            event_id: event_pass.event_id,
            max_supply:event_pass.max_supply
        };
    }

    transition claim_public_event(event_id_hash: field,claim_code: field)-> bool{
        let hash_of_hash_of_event_id_hash_self_caller : address = hash_of_two_into_address(event_id_hash,self.caller);
        let claim_code_hash : field = BHP256::hash_to_field(claim_code);
        return true then finalize(event_id_hash,hash_of_hash_of_event_id_hash_self_caller,claim_code_hash);
    }

    finalize claim_public_event (event_id_hash: field, hash_of_hash_of_event_id_hash_self_caller:address,claim_code_hash:field) {
        // Check whether the specific event exists
        assert(Mapping::contains(event_id_hash_to_event_struct, event_id_hash));

        // Check if the event has not completed
        assert(Mapping::get(event_id_hash_to_event_struct, event_id_hash).status<2u8);


        // Check if the user has already claimed
        assert(!Mapping::contains(hoho_event_plus_id_self_caller,hash_of_hash_of_event_id_hash_self_caller));

        // Check that it hasn't been claimed all
        let value_stored : u32 = Mapping::get(event_id_hash_to_claim_count,event_id_hash);

        let max_supply : u32 = Mapping::get(event_id_hash_to_event_struct, event_id_hash).max_supply;
        assert(value_stored<max_supply);

        // If not, set the user's claim status to be true
        Mapping::set(hoho_event_plus_id_self_caller,hash_of_hash_of_event_id_hash_self_caller,true);

        // Now increase the claim count by 1 corresponding to that event hash
        Mapping::set(event_id_hash_to_claim_count,event_id_hash ,value_stored+1u32 );
    }

}

```


-----



 <>
      {/* // <LoadingModal visible={loading} /> */}
      <div className="bg-createEvent text-white  px-8">
        <CreateNav />
        <div className="grid grid-cols-2">
          <div className="">
            <div>
              <div className="flex flex-col w-1/2 mx-auto justify-center">
                <div className="flex items-center w-full">
                  <div className="relative w-[20%] flex justify-center">
                    <Link href="/dashboard/active" className="w-full p-4">
                      <Image
                        src={"/icons/back-btn.svg"}
                        width={40}
                        height={20}
                        alt="back-btn"
                        className="back-btn"
                      />
                    </Link>
                  </div>
                  <p className="text-3xl my-3 ">Create an Event</p>
                </div>
                <div className="my-3 ">
                  <p className="text-xl ">Upload a file</p>
                  <p className="text-white opacity-40">
                    Upload or choose your file to upload
                  </p>
                </div>
                <label className={`flex justify-center mx-auto w-[120%] border-2 bg-[rgb(30,30,30)] bg-opacity-75 border-[#E0E0E0] border-opacity-40 border-dashed  rounded-md  cursor-pointer ${formInput.cover ? "py-8 px-8" : "py-44 px-0" } `}>
                  <span className="flex items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-6 h-6 text-gray ${formInput.cover ? "hidden" : "flex" } `}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </span>
                  {imgLoading ? (
                    <div>Uploading to IPFS..</div>
                  ) : formInput.cover == "" ? (
                    <div>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={formInput.cover}
                        //   alt="uploaded-cover"
                        className="rounded-lg h-[350px] w-full"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="file_upload"
                    className="hidden"
                    onChange={changeImage}
                    disabled={imgLoading}
                  />
                </label>
                <div className="flex justify-center mt-4 gap-4 items-center">
                  <Image
                    src={"/cattt.jpeg"}
                    width={60}
                    height={60}
                    alt="cat"
                    className="rounded-lg"
                  />
                  <p className="text-white opacity-40">default cover image</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-16">
            <div className="flex flex-col w-3/4 mx-auto  ">
              <div className="py-4 flex justify-between">
                <div className="w-full flex justify-between">
                  <div>
                    <h3 className="text-xl">Private Event</h3>
                    <p className="opacity-40">
                      Display this on feature section of landing page.
                    </p>
                  </div>
                  <div className={`flex items-center cursor-pointer`}>
                    <div
                      className={`w-12 h-6 bg-[#1E1E1E] rounded-full p-1 duration-300 ease-in-out ${
                        formInput.is_shortlist_enabled
                          ? "bg-green-500"
                          : "bg-[#1E1E1E]"
                      }`}
                      onClick={toggleSwitch}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                          formInput.is_shortlist_enabled ? "translate-x-6" : ""
                        }`}
                      ></div>
                    </div>
                    {/* <span className="ml-2 text-sm">{isShortlistEnabled ? 'ON' : 'OFF'}</span> */}
                  </div>
                </div>
                {/* https://gdowens.github.io/react-toggle-button/ to use toggle in the actual code */}
                {/* <ToggleButton value={false} /> */}
              </div>
              <label className="pb-2">Event Name</label>
              <input
                type="text"
                id="event-name"
                placeholder="event id"
                className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 rounded-lg p-2"
                onChange={(e) => {
                  setFormInput({
                    ...formInput,
                    event_id: parseInt(e.target.value)
                  });
                }}
                disabled={imgLoading}
              />
            </div>

            <div className=" flex w-3/4 mx-auto  ">
              <div className="flex flex-col w-3/4 mx-auto my-4 mr-6 ">
                <label className="pb-2">Supply</label>
                <input
                  type="text"
                  id="event-name"
                  placeholder="2000"
                  className="bg-[#1E1E1E] bg-opacity-75 border border-[#989898] border-opacity-30 w-full rounded-lg p-2 "
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      max_supply: parseInt(e.target.value),
                    })
                  }
                  disabled={imgLoading}
                />
              </div>
            </div>

            <div className="w-3/4 mx-auto flex justify-evenly my-6">
              {/* <button className="px-4 py-2 border rounded-lg">
                            Preview
                        </button> */}
              <button className="px-4 py-2 border rounded-lg" onClick={publish}>
                Create An Event
              </button>
              {/* <PopUp/> */}
            </div>
          </div>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {popUpVisible ? <PopUp /> : <></>}

        <FooterSection />
      </div>
    </>


-----



const handleCallFunctions = async (event: MouseEventHandler<HTMLButtonElement>) => {
    // event.preventDefault();
    if (!publicKey) throw new WalletNotConnectedError();

    // if (!data) throw new Error('Collection not initialized.');

    // const uriInputs = padArray(splitStringToBigInts(uri), 4);
    // const formattedUriInput = `{ data0: ${uriInputs[0]}u128, data1: ${uriInputs[1]}u128, data2: ${uriInputs[2]}u128, data3: ${uriInputs[3]}u128 }`;

    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      "helloworld_3x20drp.aleo",
      'main',
      ["1u32", "2u32"],
      Math.floor(parseFloat(fee) * 1_000_000),
    );
    //     static createTransaction(address: string, chainId: string, program: string, functionName: string, inputs: any[], fee: number, feePrivate?: boolean): Transaction;


    const txId =
      (await (wallet?.adapter as LeoWalletAdapter).requestTransaction(
        aleoTransaction
      )) || '';
    // setTransactionId(txId);
    console.log("txId => ", txId);
  };



----


snarkos developer execute credits.aleo transfer_private_to_public  "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 1000000000000u64.private,  _nonce: 2147544859188173635598614390014841094843475220987598413361363655799329122784group.public}" "aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut" 1000000000000u64 --private-key "APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH" --query "http://localhost:3030" --broadcast "http://localhost:3030/testnet3/transaction/broadcast" --priority-fee 10000000000 --record "{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 152499870891u64.private,  _nonce: 3458911865440047565960280220243844258824394388346634923030307356754321846564group.public}"
