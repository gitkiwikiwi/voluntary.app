
BMFieldView = BrowserFieldRow.extend().newSlots({
    type: "BMFieldView",
	keyView: null,
	valueView: null,
	noteView: null,
	editableColor: "black",
	uneditableColor: "#888",
	errorColor: "red",
}).setSlots({
    init: function () {
        BrowserFieldRow.init.apply(this)
        
        this.setDivClassName("BMFieldView")

		this.setKeyView(this.addItem(Div.clone().setDivClassName("BMFieldKeyView")))
        this.addItem(this.keyView())     
   		this.keyView().turnOffUserSelect().setSpellCheck(false)   
		//this.keyView().setMinAndMaxWidth("200")
		
        this.setValueView(this.createValueView())
        this.addItem(this.valueView())  
		this.valueView().setSpellCheck(false)
		
		this.setNoteView(Div.clone().setDivClassName("BMFieldViewNoteView"))
		this.addItem(this.noteView())
        this.noteView().makeUnselectable()
        
        //his.setEditable(false)
        return this
    },

	createValueView: function() {
		return Div.clone().setDivClassName("BMFieldValueView")
	},

    syncFromNode: function () {
		BrowserFieldRow.syncFromNode.apply(this)
		//console.log(this.type() + " syncFromNode")
		
        var node = this.node()

		this.node().prepareToSyncToView()

		if (node.isVisible()) {
			this.setDisplay("block")
		} else {
			this.setDisplay("none")
		}

        this.keyView().setInnerHTML(node.key())

		if (!this.valueView().isActiveElementAndEditable()) {
			if (this.valueView().setText) {
				this.valueView().setText(node.visibleValue())
			} else {
				this.valueView().setInnerHTML(node.visibleValue())
			}
		}
		
		this.keyView().setIsVisible(node.keyIsVisible())
		this.valueView().setIsVisible(node.valueIsVisible())
		
        
        this.keyView().setContentEditable(node.keyIsEditable())
        this.valueView().setContentEditable(node.valueIsEditable())

		if (!node.valueIsEditable()) {
			//console.log("fieldview key '", node.key(), "' node.valueIsEditable() = ", node.valueIsEditable(), " setColor ", this.uneditableColor())
			this.valueView().setColor(this.uneditableColor())
		} else {
			this.valueView().setColor(this.editableColor())
		}
		
		var color = this.valueView().color()
		
		
		if (node.valueError()) {
			this.valueView().setColor(this.errorColor())
			this.valueView().setToolTip(node.valueError())
			
		} else {
			this.valueView().setBackgroundColor("transparent")
			this.valueView().setColor(color)
			this.valueView().setToolTip("")
		}

		// allow for custom view class
		if (node.valueDivClassName()) {
			this.valueView().setDivClassName(node.valueDivClassName())
		}
		
		var note = node.note()
		
		if (note) {
			this.noteView().setInnerHTML(note)
		} else {
			this.noteView().setInnerHTML("")
		}

        return this
    },
    
    syncToNode: function () {
        var node = this.node()

		if (node.keyIsEditable()) {
        	node.setKey(this.keyView().innerHTML())
		}
		
		if (node.valueIsEditable()) {
			if (this.valueView().text) {
        		node.setValue(this.valueView().text())
			} else {
        		node.setValue(this.valueView().innerHTML())
			}
		}
		
        NodeView.syncToNode.apply(this)
        return this
    },
    
    onDidEdit: function (changedView) {     
        this.log(this.type() + " onDidEdit")   
        this.syncToNode()
		this.syncFromNode()
    },

    updateSubviews: function() {
		BrowserFieldRow.updateSubviews.apply(this)
		
        var node = this.node()

        if (node && node.nodeMinHeight()) {
            var e = this.element()
            if (node.nodeMinHeight() == -1) {
                
                e.style.height = "auto"
                e.style.paddingBottom = "calc(100% - 20px)";

            } else {
                e.style.height = node.nodeMinHeight() + "px"
            }
        }
        
        return this
    },
})
