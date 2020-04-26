import React from "react";
import { MasterPage } from "@lolita/client-side/decoators";
import { Layout } from "../../templ";

@MasterPage(Layout)
export default class Home extends React.Component{
    render(){
        return (<p>test</p>)
    }
}