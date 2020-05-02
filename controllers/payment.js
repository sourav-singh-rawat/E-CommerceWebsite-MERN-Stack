//
//
var braintree = require("braintree");

//

//
//
//
    
//
//
//
//
//
//
    
//
//
//
    
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



//

var gateway = braintree.connect({
    //
    environment: braintree.Environment.Sandbox,

    merchantId: "53jrc34pby5nsyqb",
    publicKey: "cbbvj5qcm6qccdpg",
    privateKey: "3a5987484d7494cf41828ca619c3e573"
});

//
exports.genrateToken=(req,res)=>{
    gateway.clientToken.generate({}, 
        function (err, response) {
        if(err){
            //
            return res.status(500).send(err);
        }else{
            return res.send(response);
        }
    });
}

//
exports.processTranscationToServer=(req,res)=>{
    //
    var nonceFromTheClient = req.body.payment_method_nonce;
    var amountFromClient = req.amount
    //
    console.log(amountFromClient);
    
    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          //
          if(err){
            return res.status(500).send(err);
          }else{
            return  res.send(result);
          }
      });
}