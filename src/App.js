import { useForm } from 'react-hook-form';
import { useState } from "react";
import './App.css';
import contacts from './components/store';
import {CONTACT_ADD, CONTACT_UPDATE, CONTACT_REMOVE} from './components/actionTypes';

function App() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    contacts.dispatch({
      type: CONTACT_ADD,
      payload: data
    });
    contacts.subscribe(() => {
      console.log("Contact Change: ", contacts.getState());
    });
  }

  const validationOptions = {
    name: { required: "Name is required!" },
    phone: {
        required: "Phone is required!"
    },
    email: {
        required: "Email is required!",
        pattern: {
            value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
            message: 'Email is invalid format!',
        }
    }
  };

  const updateData = (id) => {
    //
  }

  const deleteData = (id) => {
    contacts.dispatch({
      type: CONTACT_REMOVE,
      payload: {
        id: id
      }
    });
    console.log(contacts.getState());
    contacts.subscribe(() => {
      console.log("Contact Change: ", contacts.getState());
    });
  }

  return (
    <div className="App">
      <div className="container">
          <form method="post" name="contact" id="frm-contact-id" onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" name="id" id="data_id" />
              <div className="row">
                  <div className="col-sm-12">
                      <input type="text" name="name" placeholder="Name" className="form-control" id="name_id" {...register('name', validationOptions.name)} />
                      <p className='error'>{errors?.name && errors?.name.message}</p>
                  </div>
              </div>
              <div className="row">
                  <div className="col-sm-12">
                      <input type="text" name="phone" placeholder="Phone" className="form-control" id="phone_id" {...register('phone', validationOptions.phone)} />
                      <p className='error'>{errors?.phone && errors?.phone.message}</p>
                  </div>
              </div>
              <div className="row">
                  <div className="col-sm-12">
                      <input type="text" name="email" placeholder="Email" className="form-control" id="email_id" {...register('email', validationOptions.email)} />
                      <p className='error'>{errors?.email && errors?.email.message}</p>
                  </div>
              </div>
              <div className="row">
                  <div className="col-sm-12">
                      <input type="submit" name="btn-submit" value="Save" className="btn btn-success btn-full" id="btnsubmit_id" />
                  </div>
              </div>
          </form>
      </div>
      <br /><br />
      <table width="100%" className="table" id="table_id">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th width="220"></th>
              </tr>
          </thead>
          <tbody>
          {contacts.getState().map((item) => {
              return(
                  <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.date}</td>
                      <td>
                      <input type="button" value="Edit" className="btn btn-success" onClick={e => updateData(item.id)}  /> 
                      <input type="button" value="Delete" className="btn btn-danger" onClick={e => deleteData(item.id)} />
                      </td>
                  </tr>
              )}
          )}
          </tbody>
      </table>
    </div>
  );
}

export default App;
