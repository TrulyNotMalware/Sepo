new Vue({
	el: '.app',
	data: {
		name: 'test',
		types: {
			type1: 'text',
            type2: 'button',
            isActive: true
		},	
		value: 0,
		Teststr: ''
	},
	methods: {
		test(Sent){
			return Sent+this.name +'\n1'
		},
		clicked(Oper){
			if(Oper=='-') this.value--;
			if(Oper=='+') this.value++;
		},
		showUtype(event){
			this.Teststr = event.target.value;
			this.value = this.Teststr.length;
		},
		change(){
			this.Teststr = 'test';
		}
	},
	computed:{//use cashing
		reverse(){
			return this.Teststr.split('').reverse().join('');
		}
	}
});
