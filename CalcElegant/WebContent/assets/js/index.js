/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
        document.getElementById('encode').addEventListener('click', this.encode, false);
        
        document.getElementById('menuContatos').addEventListener('click', this.contatos, false);
        document.getElementById('menuAgenda').addEventListener('click', this.agenda, false);
        document.getElementById('menuEmpresarial').addEventListener('click', this.empresarial, false);
        
        $('.btnVoltar').click(function(){
        	app.voltar();
        });
    },
    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    scan: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
                        
            if (result.format == "QR_CODE") {
            	window.open(result.text, '_blank', 'location=yes');
                //window.plugins.childBrowser.showWebPage(result.text, { showLocationBar: false });
            }
            

        }, function (error) { 
            alert('Vishi! Parece que alguma coisa não saiu como esperado, tente novamente... :S');
        } );
    },

    encode: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.encode(scanner.Encode.TEXT_TYPE, "http://wwvale.com.br", function(success) {
            console.log("encode success: " + success);
          }, function(fail) {
            console.log("encoding failed: " + fail);
          }
        );
    },
    
    showPage : function(name){
    	$('.page').hide();
    	$(name).show();
    },
    
    contatos : function(){
    	app.showPage('#contatos');
    },
    
    agenda : function(){
    	$('body').addClass('bgW');
    	app.showPage('#agenda');
    	
    	$('.content').addClass('animated bounceInUp');
    	$('.content').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    		$('.content').removeClass('animated bounceInUp');
    	});
    },
    
    empresarial : function(){
    	app.showPage('#empresarial');
    },
    
    voltar : function(){
    	app.showPage('#home');
    	$('body').removeClass('bgW');
    	
    	$('.content').addClass('animated bounceInUp');
    	$('.content').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    		$('.content').removeClass('animated bounceInUp');
    	});
    }

};
