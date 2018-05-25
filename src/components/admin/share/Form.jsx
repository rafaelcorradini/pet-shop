import './Form.css'
import React from 'react';

class Form extends React.Component {
  render() {
    return (
        <div>
            <h1>Cadastrar produto</h1>
                <form action="bootstrap.html">
                    <p>
                        <label htmlFor="name">Nome</label>
                        <input type="text" autoFocus name="name" required/>
                    </p>
                    <p>
                        <label htmlFor="category">Categoria</label>
                        <select name="category">
                            <option value=""></option>
                            <option value="">Categoria 1</option>
                            <option value="">Categoria 2</option>
                        </select>
                    </p>
                    <p>
                        <label htmlFor="description">Descrição</label>
                        <textarea name="description"cols="30" rows="10"></textarea>
                    </p>
                    <p>
                        <button type="submit" className="btn btn-save">Salvar</button>
                        <button type="submit" className="btn btn-cancel">Cancelar</button>
                        
                        
                    </p>
                    
                </form>
        </div>
       
            );
    }
}

export default Form;