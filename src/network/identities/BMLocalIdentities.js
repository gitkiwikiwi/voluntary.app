
BMLocalIdentities = BMListNode.extend().newSlots({
    type: "BMLocalIdentities",
}).setSlots({
    init: function () {
        BMListNode.init.apply(this)
		this.setShouldStore(true)
        this.setTitle("My identities")
        this.setNodeMinWidth(180)
        
        this.setActions(["add"])
        this.setSubnodeProto(BMLocalIdentity)
        this.setNoteIsItemCount(true)
        
        //this.setPidSymbol("_localIdentities")  
    },

    current: function() {
        if (this.itemsLength() == 0) {
            this.add()
        }
        
        return this.items()[0]
    },
    
    idWithPubKeyString: function(s) {
        return this.items().detect(function (id) {            
            return id.publicKey().toString() == s
        })
    },

	idWithName: function(s) {
        return this.items().detect(function (id) {            
            return id.name() == s
        })
	}
})
