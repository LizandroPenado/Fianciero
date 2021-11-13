import React, { Component} from "react";
//import { Form, Col, Container, ButtonGroup} from "react-bootstrap";
//import {styled} from '@mui/material/styles'
//import DataTable from "../datatable/DataTable";
//import * as XLSX from 'xlsx';
//import Swal from "sweetalert2";
import axios from "axios";
//import { Select, Button, InputLabel, MenuItem } from "@material-ui/core";
//import FileUploadIcon from '@mui/icons-material/FileUpload';
//import modalCu from "../modal/ModalCU";
//import CustomModal from "./Modal";
import Modal1 from "./Modal"; 
//import Modal from "./Modal";
class Sector extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewCompleted: false,
        todoList: [],
        modal: false,
        activeItem: {
          nombre: "",
          descripcion: "",
        },
      };
    }
  
    componentDidMount() {
      this.refreshList();
    }
  
    refreshList = () => {
      axios
        .get("http://127.0.0.1:8000/api/sectores/")
        .then((res) => this.setState({ todoList: res.data }))
        .catch((err) => console.log(err));
    };
  
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
  
    handleSubmit = (item) => {
      this.toggle();
  
      if (item.titile) {
        axios
          .put(`http://127.0.0.1:8000/api/sectores/${item.title}/`, item)
          .then((res) => this.refreshList());
        return;
      }
      /* axios
        .post("http://127.0.0.1:8000/api/sectores/", item)
        .then((res) => this.refreshList()); */
    };
  
    handleDelete = (item) => {
      axios
        .delete(`http://127.0.0.1:8000/api/sectores/{id}/${item.id}/`)
        .then((res) => this.refreshList());
    };
  
    createItem = () => {
      const sector = { nombre: "", descripcion: ""};
  
      this.setState({ activeItem: sector, modal: !this.state.modal });
    };
  
    editItem = (sector) => {
      this.setState({ activeItem: sector, modal: !this.state.modal });
    };
  
    displayCompleted = (status) => {
      if (status) {
        return this.setState({ viewCompleted: true });
      }
  
      return this.setState({ viewCompleted: false });
    };
  
    renderTabList = () => {
      return (
        <div className="nav nav-tabs">
          <span
            onClick={() => this.displayCompleted(true)}
            className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          >
            Complete
          </span>
          <span
            onClick={() => this.displayCompleted(false)}
            className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          >
            Incomplete
          </span>
        </div>
      );
    };
  
    renderItems = () => {
      const { viewCompleted } = this.state;
      const newItems = this.state.todoList.filter(
        (item) => item.completed === viewCompleted
      );
  
      return newItems.map((item) => (
        <li
          key={item.nombre}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`todo-title mr-2 ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.descripcion}
          >
            {item.nombre}
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editItem(item)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDelete(item)}
            >
              Delete
            </button>
          </span>
        </li>
      ));
    };
  
    render() {
      return (
        <main className="container">
          <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="mb-4">
                  <button
                    className="btn btn-primary"
                    onClick={this.createItem}
                  >
                    Add task
                  </button>
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush border-top-0">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
           {this.state.modal ? (
            <Modal1
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null} 
        </main>
      );
    }
  }
  
  export default Sector;