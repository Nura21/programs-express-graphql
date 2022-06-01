const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList  } = graphql; //TIPE DATA
const _ = require('lodash'); //untuk membantu mereturn data


///Dummy
var dataJurusan = [
	{
		jurusan : 'Teknik Informatika',
		kaprodi : 'Sudrajat, S. Kom, M. Kom',
		id : '1'
	},
	{
		jurusan : 'Teknik Mesin',
		kaprodi : 'Mudrajat, S. Kom, M. Kom',
		id : '2'
	},
	{
		jurusan : 'Sistem Informasi',
		kaprodi : 'Palano Pela, S. Kom, M. Kom',
		id : '3'
	}
]

var dataMahasiswa = [
	{
		id : '1',
		name : 'Muhammad Irfansyahfalah',
		umur : '22',
		jenisKelamin : 'L',
		jurusanid : '1'
	},
	{
		id : '2',
		name : 'Ririn Ga Peka',
		umur : '22',
		jenisKelamin : 'P',
		jurusanid : '3'
	},
	{
		id : '3',
		name : 'Ririn Weee',
		umur : '22',
		jenisKelamin : 'P',
		jurusanid : '3'
	},
	{
		id : '4',
		name : 'Irfansyahfalah',
		umur : '22',
		jenisKelamin : 'L',
		jurusanid : '2'
	},
	{
		id : '5',
		name : 'Muhammad Irfansyahfalah',
		umur : '22',
		jenisKelamin : 'L',
		jurusanid : '2'
	},
	{
		id : '6',
		name : 'Ririn Ga Peka',
		umur : '22',
		jenisKelamin : 'P',
		jurusanid : '1'
	},
	{
		id : '7',
		name : 'Ririn Weee',
		umur : '22',
		jenisKelamin : 'P',
		jurusanid : '3'
	},
	{
		id : '8',
		name : 'Irfansyahfalah',
		umur : '22',
		jenisKelamin : 'L',
		jurusanid : '2'
	},
]





//API using type, this is schema, schema disini objek memiliki fields dan name
const JurusanType = new GraphQLObjectType({
	name : 'jurusan',
	fields:()=> ({
		id : {type : GraphQLID},
		jurusan : {type : GraphQLString},
		kaprodi : {type : GraphQLString},
		mahasiswa : {
			type: new GraphQLList(MahasiswaType),
			resolve(parent, args){
				return _.filter(dataMahasiswa, {
					jurusanid: parent.id
				});
			}
		}
	})
});


//API using type, this is schema, schema disini objek memiliki fields dan name
const MahasiswaType = new GraphQLObjectType({
	name : 'mahasiswa',
	fields:()=> ({
		id : {type : GraphQLID},
		name : {type : GraphQLString},
		umur : {type : GraphQLInt},
		jenisKelamin : {type : GraphQLString},
		prodi : {
			type: JurusanType,
			resolve(parent, args){
				console.log(parent);
				return _.find(dataJurusan, {id:parent.jurusanid});
				//mengembalikan data yg mana mengambil dari dataJurusan, mengembalikan id berdasarkan parent(JurusanType),
				// dimana ada jurusanid yang diambil dari dataMahasiswa
			}
		}
	})
});


//RootQuery adalah directory utama, root query mengakses ke data dummy, yang mana data dummy menyesuaikan diri ke JurusanType
const RootQuery = new GraphQLObjectType({
	name : 'RootQueryType',
	fields : {
		prodi : {
			type : JurusanType, //mengarah ke JurusanType
			args : {
				id : {
					type : GraphQLID
				}
			},
			resolve(parent, args){
				console.log(typeof(args.id));
				return _.find(dataJurusan, {
					id: args.id
				});
			}
		},
		siswa : {
			type : MahasiswaType, //mengarah ke MahasiswaType
			args : {
				id : {
					type : GraphQLID
				}
			},
			resolve(parent, args){
				return _.find(dataMahasiswa, {
					id: args.id
				});
			}
		},
		readSiswa : {
			type : new GraphQLList(MahasiswaType),
			resolve(parent, args){
				return dataMahasiswa;
			}
			
		}
	}
});


module.exports = new GraphQLSchema({
	query : RootQuery
})


//Relasi TYPE
// 1. Seperti prinsip struct di dalam struct pada C++
// 2. penggunaan parent pada resolve, bertujuan agar mengarah kepada pemanggilan data yang berada di dalam type dalam type
// 3. contoh
// 	A{
// 		id,
// 		part,
// 	}

// 	B{
// 		id,
// 		type
// 		packet
// 	}

// 	Penggunaannya akan menjadi

// 	A{
// 		id,
// 		part,
// 		B{
// 			id,
// 			type,
// 			packet
// 		}
// 	}

//JANGAN LUPA SELALU APUS CACHE KALAU ADA PERUBAHAN DI TYPE ATAU SCHEMA
// KEGUNAAN MUTATION UNTUK MANIPULASI SQL LANGUANGE 