
DocumentBody = DivView.extend().newSlots({
    type: "DocumentBody",
}).setSlots({
    init: function () {
        DivView.init.apply(this)
        this.setIsRegisterForWindowResize(true)
        setTimeout(() => { this.autoAdjustZoomForMobile() })
        return this
    },
    
    setupElement: function() {
        // get this from element override
    },
    
    element: function() {
        return document.body
    },
    
    onWindowResize: function() {
        this.autoAdjustZoomForMobile()
    },
    
    autoAdjustZoomForMobile: function() {
        /*
        var w = WebBrowserScreen.width();
        var h = WebBrowserScreen.height();
        
        console.log("screen " + w + "x" + h)

        var z = "100%"
        
        if (w < 800) {
            z = "300%"
        }

        
        this.setZoom(z)
        
        //console.log("DocumentBody windowWidth: " + WebBrowserWindow.width() + " zoom: " + this.zoom() )
        */
        return this
    },
    
    zoomAdjustedWidth: function() {
        return WebBrowserWindow.width() * this.zoomRatio()
    },
    
    zoomAdjustedHeight: function() {
        return WebBrowserWindow.width() * this.zoomRatio()
    },
    
    zoomAdjustedSize: function() {
        return { width: this.zoomAdjustedWidth(), height: this.zoomAdjustedHeight() }
    },
})