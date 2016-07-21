'use strict';

function formatBarcodes(tags){

    return tags.map(function(tag){
        let temp=tag.split('-');
        return {barcode:temp[0],amount:Number(temp[1])||1};
    });
}

function mergeBarcodes(barcodes){

    let result=[];
    result=barcodes.reduce(function(cur,newValue){
        let exist=cur.find(function(item){
            return item.barcode===newValue.barcode;
        });

        if(exist)
        {
            exist.amount+=newValue.amount;
        }
        else{
            cur.push(Object.assign({},newValue));
        }
        return cur;
    },[]);
    return result;
}

function getCartItems(countedBarcodes,allItems){

    let cartItems=[];
    for(let i=0;i<countedBarcodes.length;i++)
    {
        for(let j=0;j<allItems.length;j++)
        {
            if(countedBarcodes[i].barcode===allItems[j].barcode)
            {
                cartItems.push(Object.assign({},allItems[j],{amount:countedBarcodes[i].amount}));
            }
            break;
        }
    }
    return cartItems;
}

function getSubTotal(cartItems)
{
    let beforePromotedCartItems=[];
    for(let i=0;i<cartItems.length;i++)
    {
        beforePromotedCartItems.push(Object.assign({},cartItems[i],{subTotal:cartItems[i].price*cartItems[i].amount}));
    }
    return beforePromotedCartItems;
}

function getDetailedCartItems(beforePromotedCartItems,allPromotedInfos){

    let detailedCartItems=[];
    for(let i=0;i<beforePromotedCartItems.length;i++)
    {
        for(let j=0;j<allPromotedInfos.length;j++)
        {
            for(let k=0;k<allPromotedInfos[j].barcodes.length;k++)
            {
                if(beforePromotedCartItems[i].barcode===allPromotedInfos[j].barcodes[k]) {
                    if (allPromotedInfos[j].type === 'BUY_TWO_GET_ONE_FREE') {

                        detailedCartItems.push(Object.assign({}, beforePromotedCartItems[i], {subSaveMoney: parseInt(beforePromotedCartItems[i].amount / 3) * 1 * beforePromotedCartItems[i].price}));


                    }
                    else if (allPromotedInfos[i].type === 'Twenty_Percent_Off') {
                        detailedCartItems.push(Object.assign({}, beforePromotedCartItems[i], {subSaveMoney: beforePromotedCartItems[i].subTotal * beforePromotedCartItems[i].price}))

                    }
                    break;
                }
            }
        }
    }
    return detailedCartItems;
}


function getTotalAndSaveMoney(detailedCartItems){

    let total=0,saveMoney=0;
    for(let i=0;i<detailedCartItems.length;i++)
    {
        total+=detailedCartItems[i].subTotal;
        saveMoney+=detailedCartItems[i].subSaveMoney;
    }
    total-=saveMoney;
    return Object.assign({},{total:total,saveMoney:saveMoney});
}

function print(detailedCartItems,totalAndsaveMoney){

    let receipt='';
    for(let i=0;i<detailedCartItems.length;i++)
    {
        receipt = receipt +'\n' + '名称:' + detailedCartItems[i].name +',' + '数量:' + detailedCartItems[i].amount + detailedCartItems[i].unit + ',' + '单价:' + detailedCartItems[i].price + '.00(元)' + ',' + '小计:' + (detailedCartItems[i].subTotal-detailedCartItems[i].subSaveMoney) + '.00(元)';
    }
    receipt=receipt+'\n'+'********************************************************'+'\n'+'总计:'+totalAndsaveMoney.total+'.00(元)'+'\n'+'节省:'+totalAndsaveMoney.saveMoney+'.00(元)';
    return receipt;
}