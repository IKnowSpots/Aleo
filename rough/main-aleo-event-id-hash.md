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


    function hello_world(num1: u32, num2: u32)-> u32{
        return num1+num2;
    }
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
            status: 0u8,
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
    transition toggle_private_event(event: Event,toggle_value:u8) -> Event{
        assert_eq(event.owner,self.caller);
        assert(event.status<2u8);
        //
        // assert_neq(event.status,2u8);
        let updatedEvent : Event = Event {
            owner: self.caller,
            event_id: event.event_id,
            status: toggle_value,
            max_supply: event.max_supply,
            shortlisted: event.shortlisted
        };
        return updatedEvent;
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
        // TODO: Allow only if the event status is active.
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
        let claim_count : u32 = Mapping::get(event_id_hash_to_claim_count,event_id_hash);

        let fetch_max_supply : u32 = Mapping::get(event_id_hash_to_event_struct, event_id_hash).max_supply;
        assert(claim_count<fetch_max_supply);

        let fetch_claim_hash_code : field = Mapping::get(event_id_hash_to_event_struct,event_id_hash).claim_code_hash;
        assert_eq(claim_code_hash,fetch_claim_hash_code );
        // If not, set the user's claim status to be true
        Mapping::set(hoho_event_plus_id_self_caller,hash_of_hash_of_event_id_hash_self_caller,true);

        // Now increase the claim count by 1 corresponding to that event hash
        Mapping::set(event_id_hash_to_claim_count,event_id_hash ,claim_count+1u32 );
    }

}
