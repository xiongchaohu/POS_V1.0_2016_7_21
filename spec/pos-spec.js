'use strict';


describe('formatTags',function(){
    it('should return object array includes barcode and amount',function(){
        let test=['item0001','item0003-1.5'];
        let result=formatBarcodes(test);
        let barcodes=[{barcode:'item0001',amount:1},{barcode:'item0003',amount:1.5}];
        expect(result).toEqual(barcodes);
    });
})


describe('mergeBarcodes',function(){
    it('shoule return merged barcodes include amount',function(){
        let test=[{barcode:'item0001',amount:1},{barcode:'item0001',amount:1}];
        let result=mergeBarcodes(test);
        let mergeBarcodeList=[{barcode:'item0001',amount:2}];
        expect(result).toEqual(mergeBarcodeList);
    })
})

describe('getCartItems',function(){
    it('should be detail cartItems',function(){
        let testBarcodes=[{barcode:'item0001',amount:2}];
        let testItems=[{barcode:'item0001',name:'可乐',unit:'瓶',price:3.00}];
        let cartItem=[{barcode:'item0001',name:'可乐',unit:'瓶',price:3.00,amount:2}];
        let result=getCartItems(testBarcodes,testItems);
        expect(result).toEqual(cartItem);
    })
})

describe('getSubTotal',function(){
    it('should return beforePromotedCartItems with subTotal',function(){
        let test=[{barcode:'item0001',name:'可乐',unit:'瓶',price:3.00,amount:2}];
        let expected=[{barcode:'item0001',name:'可乐',unit:'瓶',price:3.00,amount:2,subTotal:6.00}];
        let result=getSubTotal(test);
        expect(result).toEqual(expected);
    })
})

describe('getDetailedCartItems',function(){
    it('should return AfterPromotedCartItems with type',function(){
        let test=[{barcode:'item0001',name:'可乐',unit:'瓶',price:3.00,amount:3,subTotal:9.00}];
        let promotedInfo=[{type:'BUY_TWO_GET_ONE_FREE',barcodes:['item0001']}];
        let expected=[{barcode:'item0001',name:'可乐',unit:'瓶',price:3.00,amount:3,subTotal:9.00,subSaveMoney:3}];
        let result=getDetailedCartItems(test,promotedInfo);
        expect(result).toEqual(expected);
    })
})

describe('getTotalAndSaveMoney',function(){
    it('should return object with saveMoney and total',function(){
        let test=[{barcode:'item0001',name:'可乐',unit:'瓶',price:3.00,amount:3,subTotal:9.00,type:'BUY_TWO_GET_ONE_FREE',subSaveMoney:3.00}];
        let expected={total:6,saveMoney:3};
        let result=getTotalAndSaveMoney(test);
        expect(result).toEqual(expected);
    })
})

describe('print',function(){
    it('should print receipt',function(){
        let test=[{barcode:'item0001',name:'可乐',unit:'瓶',price:3.00,amount:3,subTotal:9.00,type:'BUY_TWO_GET_ONE_FREE',subSaveMoney:3.00}];
        let expected='\n'+'名称:'+'可乐' + ',' + '数量:' + 3 + '瓶' + ',' + '单价:' + 3 + '.00(元)' + ',' + '小计:' +6 + '.00(元)'+
        '\n'+'********************************************************'+'\n'+'总计:'+6+'.00(元)'+'\n'+'节省:'+3+'.00(元)';
        let test1={total:6,saveMoney:3};
        let result=print(test,test1);
        expect(result).toBe(expected);
    })
})


