sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            onInit: function () {

                let ImageList = {
                    Imagens: []
                };

                let ImageModel = new JSONModel(ImageList);
                let view = this.getView();

                view.setModel(ImageModel, "ModeloImagem");

            },
            

            onPressBuscar: function() {
                const inputBusca =  this.byId("inpBusca");
                let query = inputBusca.getValue();
                //alert(query);

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${query}&pageNumber=1&pageSize=10&autoCorrect=true`,
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "b8af0ef985mshb287b3ab6483ddap1082bejsn122ef5ca402c",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    const oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();

                    oDadosImage.Imagens = [];

                    let listaResultados = response.value;
                    let newItem;

                    listaResultados.forEach(element => {
                        newItem = element;
                        oDadosImage.Imagens.push(newItem);
                    });

                    oImageModel.refresh();

                }.bind(this)
                );

            }
        });
    });
