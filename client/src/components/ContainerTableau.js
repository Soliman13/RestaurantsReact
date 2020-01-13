import React, { Component } from 'react';
import Tableau from './Tableau';
import TableauPagination from './TableauPagination';

class ContainerTableau extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            nbDeRestos: 0,
            page: 1,
            pageSize: 10,
            restos: []
        }
    }
    
    componentDidMount(){
        this.getDataFromServer();
    }
    
    getDataFromServer() {
        let isLoaded = false
        fetch('http://localhost:8080/api/restaurants?page=' + this.state.page +'&pagesize=' + this.state.pageSize)
        .then(response => {
            return response.json(); // transforme le json texte en objet js
        })
        .then(res => { // data c'est le texte json de response ci-dessus
        this.setState({
            restos: res.data,
            nbDeRestos: res.count,
        });
        // console.log(newRestos)
    }).catch(err => {
        console.log("erreur dans le get : " + err)
    });
}

updateStatePagination = (val) => {
    switch (val){
        case 'premiere':
        this.setState({ page: 1 }, this.getDataFromServer);
        break;
        case 'precedente':
        this.setState((state) => ({ page: state.page - 1 }), this.getDataFromServer);
        break;
        case 'suivante':
        this.setState((state) => ({ page: state.page + 1 }), this.getDataFromServer);
        break;
        case 'derniere':
        this.setState((state) => ({ page: Math.trunc(state.nbDeRestos/state.pageSize) }), this.getDataFromServer);
        break;
        default:
        this.setState({ page: val }, this.getDataFromServer);
    }
}

render(){
    return (
        <div>
        <Tableau restos = {this.state.restos}></Tableau>
        <TableauPagination page= {this.state.page} pageSize= {this.state.pageSize} nbDeRestos={this.state.nbDeRestos}
        updateStatePagination={this.updateStatePagination}>
        </TableauPagination>
        </div>
        )
    }
}

export default ContainerTableau;