import React from "react";
import { Navigate } from "react-router-dom";
function Protected({isLogin,components}){
    
    if(!isLogin){
        return<Navigate to ="/" replace/>
    }
    return components
}

export default Protected;