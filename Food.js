class Foods{
    constructor(){
        this.image=loadImage("Milk.png")
        this.foodStock=0
    }
    getFoodStock(){
        return this.foodStock
    }
    garden(){
        background(gardernImg,500,400)
    }
    bedroom(){
        background(bedImg,500,400)
    }
    bathroom(){
        background(washImg,500,400)
    }
    
    updateFood(foodStock){
        this.foodStock=foodStock
    }
    display(){
        var x=80;
        var y=100
       imageMode(CENTER)
       image(this.image,1500,220,70,70)
       if(this.foodStock !== 0){
           for(var i =0 ;i<this.foodStock;i++){
               if(i%12===0){
                  x=80
                  y=y+50
               }
               image(this.image,x,y,50,50)
               x=x+30
           }
       }
       
    }
}