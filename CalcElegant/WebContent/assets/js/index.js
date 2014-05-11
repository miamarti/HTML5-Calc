var calc = {};
var app = {
	initialize : function() {
		this.bindEvents();
	},

	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady : function() {
		calc = {
			'tempVisor' : '',
			'initValue' : 0,
			'operador' : "",
			'result' : 0,
			'continuar' : true,

			'setValue' : function(value) {
				if (this.continuar) {
					this.tempVisor += value;
				} else {
					if (this.operador != "") {
						this.tempVisor += value;
					} else {
						this.tempVisor = value;
						this.continuar = true;
					}
				}
				document.getElementsByName('visor')[0].value = this.tempVisor;
			},

			'setOperador' : function(opc) {
				if (opc != "=") {
					this.initValue = document.getElementsByName('visor')[0].value;
					this.tempVisor += " " + opc + " ";
					this.operador = opc;
				} else {
					try {
						this.result = eval(this.tempVisor);
						document.getElementsByName('visor')[0].value = this.result;
						this.tempVisor = "(" + this.tempVisor + ")";
					} catch (e) {
						document.getElementsByName('visor')[0].value = "ERRO";
						this.tempVisor = 0;
					}
					this.initValue = 0;
					this.operador = "";
					this.continuar = false;
				}
			},

			'setReset' : function() {
				this.tempVisor = '';
				this.initValue = 0;
				this.operador = "";
				this.result = 0;
				this.continuar = true;
				document.getElementsByName('visor')[0].value = 0;
			}

		};
	}
};
