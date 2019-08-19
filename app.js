new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        startGame:function(){
            this.gameIsRunning=true;
            this.playerHealth=100;
            this.monsterHealth=100;
        },
        attack:function(){


            
            var damage=this.calculatedDamage(3,10) 
            this.monsterHealth-=damage
            this.turns.unshift( {
                isPlayer:true,
                text:'You gave opponent  '+damage+' damage'
            });
            if(this.checkWin()){
                return
            }

            this.monsterAttack()
            
            
        },
        specialAttack:function(){
            var damage=this.calculatedDamage(10,20) 
            this.monsterHealth-=damage
            this.turns.unshift( {
                isPlayer:true,
                text:'You gave opponent  '+damage+' hard damage'
            });
            if(this.checkWin()){
                return
            }
            this.monsterAttack()

        },
        monsterAttack:function(){
            
            var damage=this.calculatedDamage(4,12)
            this.playerHealth-=damage

            this.checkWin()
            this.turns.unshift( {
                isPlayer:false,
                text:'Opponent gave You '+damage+' damage'
            });
        },
        heal:function(){
            if(this.playerHealth<=60){
                this.playerHealth+=10;
                this.turns.unshift( {
                    isPlayer:true,
                    text:'You heal 10 health'
                });
                this.monsterAttack()
            }
            
           

        },
        giveUp:function(){

            this.gameIsRunning=false
            this.turns=[]

        },
        calculatedDamage:function(min,max){
            return Math.max(Math.floor(Math.random()*max)+1,min);
        },
        checkWin:function(){
            if(this.monsterHealth<=0){
                if(confirm('you won! Start new game?')){
                    this.startGame()
                
                }
                else{
                    this.gameIsRunning=false
                }
                return true;

            } else if (this.playerHealth<=0){
                if(confirm('you lost! Start new game?')){
                    this.startGame()
                
                }
                else{
                    this.gameIsRunning=false
                }
                return true;
            }
            return false;
        }
    }
})