import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
	const [ userName, setUserName ] = useState([]);
	useEffect(
		() => {
			status && setUserName((user) => [ ...user, status ]);
		},
		[ status ]
	);

	return (
		<div className="Hero">
			<h1>USER ONBOARDING</h1>
			<Form className="form__1">
				<Field className="field" type="text" name="user" placeholder="Username" />
				{touched.user && errors.user && <p className="Error">{errors.user}</p>}

				<Field className="field" type="text" name="email" placeholder="Email" />
				{touched.email && errors.email && <p className="Error">{errors.email}</p>}

				<Field className="field" type="text" name="password" placeholder="Password" />
				{touched.password && errors.password && <p className="Error">{errors.password}</p>}

				<label>
					Accept Terms and Conditions
					<Field type="checkbox" name="terms" checked={values.terms} />
				</label>

				<button type="submit">Submit</button>
			</Form>
			{userName.map((id) => (
				<div className="UserCard">
					<ul className="list" key={userName.Id}>
						<li>Username: {id.user}</li>
						<li>Email: {id.email}</li>
						<li>Password: {id.password}</li>
					</ul>
				</div>
			))}
		</div>
	);
};

const FormikUserForm = withFormik({
	mapPropsToValues({ user, email, password, terms }) {
		return {
			user: user || "",
			email: email || "",
			password: password || "",
			terms: terms || false
		};
	},

	validationSchema: Yup.object().shape({
		user: Yup.string().required(),
		email: Yup.string().required(),
		password: Yup.string().required(),
		terms: Yup.string().required()
	}),

	handleSubmit(values, { setStatus }) {
		axios
			.post("https://reqres.in/api/users/", values)
			.then((res) => {
				setStatus(res.data);
				console.log(res);
			})
			.catch((error) => console.log(error.res));
	}
})(UserForm);

export default FormikUserForm;
