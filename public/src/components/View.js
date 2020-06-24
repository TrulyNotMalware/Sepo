
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

const xinput ={
	template:`
	<input v-if="type == 'text'" :type="type" :name="name" @keyup="noscript">
    <input v-else-if="type == 'submit'" :type="type" :name="name" @click="nosubmit">
	`,
	data(){
		return {
			tap: this.type,
			submitcontents: ''
		}
	},
	props:{
		type:{
			type:String,
			required: true, 
		},
		name:{
			type:String,
			default: 'defaultName'
		}
	},
	methods:{
		nosubmit(event){
			alert(event.target.value);
		},
		noscript(event){
			if(event.key =="<" || event.key==">") {
				console.log("replace\n");
				this.submitcontents+='*';
			}else{
				this.submitcontents+=event.key;
			}
			console.log(event.key);
			console.log(this.submitcontents);
		}
	},
	computed:{
	}
}

const newform = {
    template:`
    <form :method="method" :action="action">
		<xinput type="text"></xinput>
		<xinput type="submit"></xinput>
    </form>
	`,
	components:{
		xinput
	},
    props:{
        action:{
            type:String,
            required: true
        },
        method:{
            type: String,
            required: true
        }
    },
    data() {
        return {

        }
    },
    methods:{

    }


};

var Modify = new Vue({
	el: "#modify",
	components:{
		newform
	},
	data : {
		
	},

});

