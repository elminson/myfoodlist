var Comida = React.createClass({
    getInitialState: function(){
        return { 
            like: Boolean(this.props.like),
            editing: false

        }
    },
    handleLike: function(){
        this.setState({like: !this.state.like})
    },
    edit: function() {
    	this.setState({editing: true})
    },
    cancel: function() {
    	this.setState({editing: false})
    },
    remove: function(){
    	this.props.onRemove(this.props.index)
    },
	save: function(){
    	this.props.onChange(this.refs.nuevoNombre.value,this.props.index);
    	this.setState({editing: false})
    },
    showEditingView: function(){
    	return (
            <div className="comida">
             <input ref="nuevoNombre" type="text" className="form-control" placeholder="Nuevo Nombre" defaultValue={this.props.nombre}/>
             <div>
             	<div className="glyphicon glyphicon-ok-circle cicle blue" onClick={this.save} /> 
             	<div className="glyphicon glyphicon-remove-circle cicle red" onClick={this.cancel} /> 
             </div>
            </div>
            )	
    },
    showFinalView: function(){
		return (
            <div className="comida">
                <h1 className="bg-success">{this.props.nombre}</h1>
                <p className="bg-info">
                    Posición: <i>{this.props.children}</i>
                </p>
                <div>
                    <input type="checkbox" className="glyphicon glyphicon-heart heart" 
                    onChange={this.handleLike} 
                    defaultChecked={this.state.like}/>
                    <br />
                    Like: {String(this.state.like)}
                </div>
                <div>
                	<div className="glyphicon glyphicon-pencil blue" onClick={this.edit} />
                	<div className="glyphicon glyphicon-trash red" onClick={this.remove} />
                </div>
            </div>
            )
    },
    render: function() {
    	if(this.state.editing){
    	return this.showEditingView();
    	} else {
        return this.showFinalView();
    	}
    }
});

var ListaComida = React.createClass({
    getInitialState: function() {
        return {
            comidas: [
                'Tacos',
                'Paella',
                'Ceviche',
                'Arroz'
            ]
        };
    },
    add: function(comida) {
    	var nuevaComida = this.refs.nuevaComida.value;
    	if(nuevaComida =="") {
    		if(typeof comida == 'undefined')
    		{
    			nuevaComida="Nueva Comida"
    		} else {
    			nuevaComida=comida;
    		}
    	}
        
        var arr = this.state.comidas;
        arr.push(nuevaComida);
        this.setState({comidas: arr});
        this.refs.nuevaComida.value = "";
    
    },
    update: function(nuevoNombre,i){
    	var arr = this.state.comidas;
    	arr[i]=nuevoNombre;
    	this.setState({comidas:arr});
    },
    remove: function(i){
    	var arr = this.state.comidas;
    	arr.splice(i,1);
    	this.setState({comidas: arr})
    },
    eachItem: function (comida, i) {
    	 	return (
    	 	<Comida key={i} 
    	 		index={i}
    	 		nombre={comida}
    	 		onRemove={this.remove}
    	 		onChange={this.update} >
                {i+1}
			</Comida>
			)
    },
    handleKeyDown: function(e){
    	if(e.charCode === 13){
    		this.add()
    	}
    },
    render: function() {
        return(<div className="centerBlock">
                <header>
                    <h1>Mis comidas favoritas</h1>
                    <i>Total: {this.state.comidas.length}</i>
                </header>
                <div className="input-group">
                <input ref="nuevaComida" type="text" onKeyPress={this.handleKeyDown} className="form-control" placeholder="Agregar nueva comida" />
                <span className="input-group-btn">
                	<div className="btn bnt-default btn-success"
                	onClick={this.add.bind(null,"Nueva Comida")}
                	>+</div>
                </span>
                </div>
                <div>
                    {this.state.comidas.map(this.eachItem)}
                </div>
            </div>)
    }
});


ReactDOM.render(<ListaComida/>, document.getElementById('container')
);