import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import FindData from "../components/Auth/FindData";
import Login from "../components/Auth/Login";
import AddData from "../components/PopUps/AddData";
import Loading from "../components/PopUps/Loading";
import PopUps from "../components/PopUps/PopUps";
import useWindowDimensions from "../components/ScreenSize";
import { karyawanByKtp as getKaryawanByKtp } from "../redux/actions/Karyawan";

function Home({ Auth: { isLogin, userData }, PopUpState: { isPoped, loadingComp }, getKaryawanByKtp, Karyawan: { oneData } }) {
	const { width, height } = useWindowDimensions();
	const innitialValue = {
		login: false,
		check: false,
	};

	const [state, setState] = useState(innitialValue);

	const showLogin = () => {
		setState((prevState) => ({ ...prevState, login: !prevState.login }));
	};
	const showCheck = () => {
		setState((prevState) => ({ ...prevState, check: !prevState.check }));
	};
	const startFind = async (ktp) => {
		const response = await getKaryawanByKtp(ktp);
		if (response === true) {
			document.getElementById("showClick").click();
		}
	};

	return (
		<>
			{isLogin ? userData.role === "admin" ? <Redirect to="/admin" /> : <Redirect to="/user" /> : null}
			{isPoped ? <PopUps /> : null}
			{loadingComp ? <Loading /> : null}
			{state.login ? <Login onClick={showLogin} /> : null}
			{state.check ? <FindData onClick={showCheck} getKaryawanByKtp={startFind} oneData={oneData} /> : null}
			<AddData title="employee" type={"view"} viewOnly={true}>
				<>
					<div className="form">
						<div className="h5">Cabang's Employees Data</div>
						<label className="mt-1">Name</label>
						<input disabled type="text" name="nama" value={oneData ? oneData.nama : ""} className="form-control" placeholder="Name" />
						<label className="mt-1">Birth Place</label>
						<input disabled type="text" name="tempatLahir" value={oneData ? oneData.tempatLahir : ""} className="form-control" placeholder="Birth Place" />
						<label className="mt-1">Birth Date</label>
						<input disabled type="date" name="tanggalLahir" value={oneData ? oneData.tanggalLahir.substr(0, 10) : ""} className="form-control" />
						<label className="mt-1">Start Working</label>
						<input disabled type="date" name="tanggalMasuk" value={oneData ? oneData.tanggalMasuk.substr(0, 10) : ""} className="form-control" placeholder="Start Working" />
						<label className="mt-1">KTP</label>
						<input disabled type="text" name="nomorKtp" value={oneData ? oneData.personalData.nomorKtp : ""} className="form-control" placeholder="KTP" />
						<label className="mt-1">KK</label>
						<input disabled type="text" name="nomorKk" value={oneData ? oneData.personalData.nomorKk : ""} className="form-control" placeholder="KK" />
						<label className="mt-1">NPWP</label>
						<input disabled type="text" name="npwp" value={oneData ? oneData.personalData.npwp : ""} className="form-control" placeholder="NPWP" />
						<label className="mt-1">Bank</label>
						<input disabled type="text" name="bank" value={oneData ? oneData.personalData.bank : ""} className="form-control" placeholder="Bank Name" />
						<label className="mt-1">Bank Account</label>
						<input disabled type="text" name="nomorRekening" value={oneData ? oneData.personalData.nomorRekening : ""} className="form-control" placeholder="Bank Account" />
						<label className="mt-1">Salary</label>
						<input disabled type="text" name="gaji" value={oneData ? oneData.personalData.gaji : ""} className="form-control" placeholder="Salary" />
						<label className="mt-1">Province</label>
						<input disabled type="text" name="provinsi" value={oneData ? oneData.alamat.provinsi : ""} className="form-control" placeholder="Province" />
						<label className="mt-1">Regency</label>
						<input disabled type="text" name="kabupaten" value={oneData ? oneData.alamat.kabupaten : ""} className="form-control" placeholder="Regency" />
						<label className="mt-1">District</label>
						<input disabled type="text" name="kecamatan" value={oneData ? oneData.alamat.kecamatan : ""} className="form-control" placeholder="District" />
						<label className="mt-1">Sub-District</label>
						<input disabled type="text" name="kelurahan" value={oneData ? oneData.alamat.kelurahan : ""} className="form-control" placeholder="Sub-District" />
						<label className="mt-1">Postal Code</label>
						<input type="text" name="kodePos" disabled value={oneData ? oneData.alamat.kodePos : ""} className="form-control" placeholder="Postal Code" />
						<label className="mt-1">Address Detail</label>
						<input disabled type="text" name="detailAlamat" value={oneData ? oneData.alamat.detailAlamat : ""} className="form-control" placeholder="Address Detail" />
					</div>
				</>
			</AddData>
			<div className="home-container" style={{ width, height }}>
				<div className="wrapper" style={{ width: 0.9 * width, height: 0.9 * height }}>
					<div className="main-picture">
						<img src="https://picsum.photos/800/550" alt="gambar awal" className="main-image" />
					</div>
					<div className="login-side">
						<div className="text-center">
							<h3>Selamat Datang</h3>
						</div>
						<div className="shadow p-3 mb-5 bg-white rounded">
							<div className="card text-white bg-primer mb-3 main-item pointer">
								<div className="card-header text-center" onClick={showLogin}>
									Login
								</div>
							</div>
							<div className="card text-white bg-second mb-3 main-item pointer">
								<div className="card-header text-center" onClick={showCheck}>
									Periksa Data
								</div>
							</div>
							<button hidden data-toggle="modal" data-target="#addDataLabel" id='showClick'></button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => ({
	Auth: state.Auth,
	PopUpState: state.PopUp,
	Karyawan: state.Karyawan,
});

const mapDispatchToProps = { getKaryawanByKtp };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
