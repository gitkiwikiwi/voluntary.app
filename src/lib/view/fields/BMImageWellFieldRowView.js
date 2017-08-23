
BMImageWellFieldRowView = BMFieldRowView.extend().newSlots({
    type: "BMImageWellFieldView",
}).setSlots({
    init: function () {
        BMFieldRowView.init.apply(this)
		this.keyView().setDivClassName("BMImageWellKeyField") //.setDisplay("none")
		//this.valueView().setContentEditable(false)
        this.turnOffUserSelect()
        return this
    },

	createValueView: function() {
		return ImageWellView.clone()
	},
	
	imageWellView: function() {
		return this.valueView()
	},

    syncFromNode: function () {
        var field = this.node()

		if (this.imageWellView()) {
			//console.log("field = ", field.type())
			this.keyView().setInnerHTML(field.key())
			this.imageWellView().setImageDataURLs(field.value())
		}
        return this
    },

    syncToNode: function () {
        var field = this.node()
		
		console.log(this.typeId() + "syncToNode()  this.imageWellView().imageDataURLs() = ", this.imageWellView().imageDataURLs())
		
		if (field.valueIsEditable()) {
        	field.setValue(this.imageWellView().imageDataURLs())
		}
		
        //NodeView.syncToNode.apply(this)
        return this
    },
    
    didUpdateImageWellView: function(anImageWell) {
		this.setNeedsSyncToNode(true)
		return this
    },
})
