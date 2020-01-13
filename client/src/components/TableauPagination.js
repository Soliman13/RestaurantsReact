import React, { PureComponent } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

import './TableauPagination.css';

class TableauPagination extends PureComponent {
    
    state = {
        numberBtn1: 1,
        numberBtn2: 2,
        numberBtn3: 3,
    }
    
    getButtonNumber = () =>{
        //premiere page
        if(this.props.page === 1){
            this.setState({
                numberBtn1: 1,
                numberBtn2: 2,
                numberBtn3: 3,
            })
        }
        // derniere page
        else if(this.props.page === Math.trunc(this.props.nbDeRestos/this.props.pageSize)) {
            this.setState({
                numberBtn1: this.props.page-2,
                numberBtn2: this.props.page-1,
                numberBtn3: this.props.page,
            })
        }
        // autre page
        else{
            this.setState({
                numberBtn1: this.props.page-1,
                numberBtn2: this.props.page,
                numberBtn3: this.props.page+1,
            })
        }
    }
    
    onClickHandler = (val) => {
        this.props.updateStatePagination(val)
    }
    
    render(){
        this.getButtonNumber();
        return (
            <ButtonGroup className="ContainerPagination" variant="contained" color="primary" aria-label="contained primary button group">
            
            <Button onClick={() => this.onClickHandler("premiere")}
            disabled={this.props.page == 1}>
            &lt;&lt;
            </Button>
            <Button onClick={() => this.onClickHandler("precedente")}
            disabled={this.props.page == 1}>
            &lt;
            </Button>
            <Button onClick={() => this.onClickHandler(this.state.numberBtn1)}
            disabled={this.state.numberBtn1 == this.props.page || this.props.page == this.state.numberBtn1}>
            {this.state.numberBtn1}
            </Button>
            <Button onClick={() => this.onClickHandler(this.state.numberBtn2)}
            disabled={this.props.page == this.state.numberBtn2 || this.props.page == this.state.numberBtn2}>
            {this.state.numberBtn2}
            </Button>
            <Button onClick={() => this.onClickHandler(this.state.numberBtn3)}
            disabled={this.props.page == Math.trunc(this.props.nbDeRestos/this.props.pageSize) || this.props.page == this.state.numberBtn3}>
            {this.state.numberBtn3}
            </Button>
            <Button onClick={() => this.onClickHandler("suivante")}
            disabled={this.props.page == Math.trunc(this.props.nbDeRestos/this.props.pageSize)}
            className="ButtonDefault">
            >
            </Button>
            <Button disabled onClick={() => this.onClickHandler("derniere")}
            disabled={this.props.page == Math.trunc(this.props.nbDeRestos/this.props.pageSize)}>
            >>
            </Button>
            </ButtonGroup>
            );
        }
    }
    
    export default TableauPagination;