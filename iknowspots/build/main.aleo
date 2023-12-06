program iknowspots_2.aleo;

struct AddressStruct:
    addr0 as address;
    addr1 as address;
    addr2 as address;
    addr3 as address;

record Event:
    owner as address.private;
    event_id as field.private;
    status as u8.private;
    max_supply as u32.private;
    shortlisted as AddressStruct.private;

struct EventStruct:
    is_private as boolean;
    event_owner as address;
    event_id as field;
    status as u8;
    max_supply as u32;
    claim_code_hash as field;

record NFT:
    owner as address.private;
    event_id as field.private;

record EventPass:
    owner as address.private;
    event_id as field.private;
    max_supply as u32.private;

record EventNFT:
    owner as address.private;
    event_id as field.private;
    max_supply as u32.private;


mapping event_id_hash_to_event_struct:
	key as field.public;
	value as EventStruct.public;


mapping event_id_hash_to_claim_count:
	key as field.public;
	value as u32.public;


mapping hoho_event_plus_id_self_caller:
	key as address.public;
	value as boolean.public;

closure hello_world:
    input r0 as u32;
    input r1 as u32;
    add r0 r1 into r2;
    output r2 as u32;


closure hash_of_two_into_address:
    input r0 as field;
    input r1 as address;
    cast r1 into r2 as field;
    add r0 r2 into r3;
    hash.bhp256 r3 into r4 as address;
    output r4 as address;


function create_private_event:
    input r0 as field.private;
    input r1 as u32.private;
    cast aleo1fu0k2qfytzs5fhesgfgjuax6wsh9xx4ftpdapnhzrtruy0tx3urqx3p0ut aleo17sv2qntg7duvr3h6fturqrf0qc7srgekcnvdu3nuuwqvtlnpyugsn965t9 aleo1wvdfek6yr6djgr4vu2e85xq9lgly0v6vmxche6crrk99yma86c9q4sra7c aleo13lt3j3hs74ll0d3u8tlul7lgptr9dglp57kmskacgg2v4y748cxs2h45mp into r2 as AddressStruct;
    call hash_of_two_into_address r0 self.caller into r3;
    cast self.caller r0 0u8 r1 r2 into r4 as Event.record;
    async create_private_event r0 r3 into r5;
    output r4 as Event.record;
    output r5 as iknowspots_2.aleo/create_private_event.future;

finalize create_private_event:
    input r0 as field.public;
    input r1 as address.public;
    contains event_id_hash_to_event_struct[r0] into r2;
    not r2 into r3;
    assert.eq r3 true;
    cast true r1 r0 3u8 0u32 0field into r4 as EventStruct;
    set r4 into event_id_hash_to_event_struct[r0];


function create_public_event:
    input r0 as field.private;
    input r1 as u32.private;
    input r2 as field.private;
    hash.bhp256 r2 into r3 as field;
    cast false self.caller r0 0u8 r1 r3 into r4 as EventStruct;
    async create_public_event r4 into r5;
    output true as boolean.private;
    output r5 as iknowspots_2.aleo/create_public_event.future;

finalize create_public_event:
    input r0 as EventStruct.public;
    contains event_id_hash_to_event_struct[r0.event_id] into r1;
    not r1 into r2;
    assert.eq r2 true;
    set r0 into event_id_hash_to_event_struct[r0.event_id];
    set 0u32 into event_id_hash_to_claim_count[r0.event_id];


function toggle_private_event:
    input r0 as Event.record;
    input r1 as u8.private;
    assert.eq r0.owner self.caller;
    lt r0.status 2u8 into r2;
    assert.eq r2 true;
    cast self.caller r0.event_id r1 r0.max_supply r0.shortlisted into r3 as Event.record;
    output r3 as Event.record;


function toggle_public_event:
    input r0 as field.private;
    input r1 as u8.private;
    async toggle_public_event r0 r1 self.caller into r2;
    output true as boolean.public;
    output r2 as iknowspots_2.aleo/toggle_public_event.future;

finalize toggle_public_event:
    input r0 as field.public;
    input r1 as u8.public;
    input r2 as address.public;
    contains event_id_hash_to_event_struct[r0] into r3;
    assert.eq r3 true;
    get event_id_hash_to_event_struct[r0] into r4;
    lt r4.status 2u8 into r5;
    assert.eq r5 true;
    assert.eq r4.event_owner r2;
    cast false r4.event_owner r4.event_id r1 r4.max_supply r4.claim_code_hash into r6 as EventStruct;
    set r6 into event_id_hash_to_event_struct[r0];


function set_shortlist:
    input r0 as Event.record;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as address.private;
    input r4 as address.private;
    assert.neq r1 r2;
    assert.neq r1 r3;
    assert.neq r1 r4;
    assert.neq r2 r3;
    assert.neq r2 r4;
    assert.neq r3 r4;
    assert.eq self.signer r0.owner;
    cast r1 r2 r3 r4 into r5 as AddressStruct;
    cast r1 r0.event_id r0.max_supply into r6 as EventPass.record;
    cast r2 r0.event_id r0.max_supply into r7 as EventPass.record;
    cast r3 r0.event_id r0.max_supply into r8 as EventPass.record;
    cast r4 r0.event_id r0.max_supply into r9 as EventPass.record;
    cast r0.owner r0.event_id r0.status r0.max_supply r5 into r10 as Event.record;
    output r10 as Event.record;
    output r6 as EventPass.record;
    output r7 as EventPass.record;
    output r8 as EventPass.record;
    output r9 as EventPass.record;


function claim_private_event:
    input r0 as EventPass.record;
    assert.eq r0.owner self.caller;
    cast self.caller r0.event_id r0.max_supply into r1 as EventNFT.record;
    output r1 as EventNFT.record;


function claim_public_event:
    input r0 as field.private;
    input r1 as field.private;
    call hash_of_two_into_address r0 self.caller into r2;
    hash.bhp256 r1 into r3 as field;
    async claim_public_event r0 r2 r3 into r4;
    output true as boolean.private;
    output r4 as iknowspots_2.aleo/claim_public_event.future;

finalize claim_public_event:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as field.public;
    contains event_id_hash_to_event_struct[r0] into r3;
    assert.eq r3 true;
    get event_id_hash_to_event_struct[r0] into r4;
    lt r4.status 2u8 into r5;
    assert.eq r5 true;
    contains hoho_event_plus_id_self_caller[r1] into r6;
    not r6 into r7;
    assert.eq r7 true;
    get event_id_hash_to_claim_count[r0] into r8;
    get event_id_hash_to_event_struct[r0] into r9;
    lt r8 r9.max_supply into r10;
    assert.eq r10 true;
    get event_id_hash_to_event_struct[r0] into r11;
    assert.eq r2 r11.claim_code_hash;
    set true into hoho_event_plus_id_self_caller[r1];
    add r8 1u32 into r12;
    set r12 into event_id_hash_to_claim_count[r0];
