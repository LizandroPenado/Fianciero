import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import Botones from "../datatable/Botones";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import ModalCU from "../modal/ModalCU";

class Cuenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        codigo: "",
        nombre: "",
        tipo: "",
        tipoModal: "",
      },
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/cuentas/")
      .then((response) => {
        this.setState({ cuentas: response.data });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            "Por el momento no hay conexión con la base de datos",
        });
      });
  }

  render() {
    const columns = [
      {
        name: "id",
        label: "Código",
      },
      {
        name: "nombre",
        label: "Cuenta",
      },
      {
        name: "tipo",
        label: "Tipo",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return <Botones />;
          },
        },
      },
    ];
    return (
      <>
        <div className="pt-3">
          <Button
            variant="success"
            /* onClick={() => {
              this.setState({ form: null, tipoModal: "insertar" });
              this.modalInsertar();
            }} */
          >
            Crear
          </Button>
        </div>
        <DataTable
          titulo="Catalogo"
          noRegistro="No hay registro de empleados"
          columnas={columns}
          datos={this.state.cuentas}
        />
      </>
    );
  }
}

export default Cuenta;