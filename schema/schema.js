const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt  } = graphql; //TIPE DATA
const _ = require('lodash'); //untuk membantu mereturn data


///Dummy
var dataJurusan = [
	{
		jurusan : "Teknik Informatika",
		kaprodi : "Sudrajat, S. Kom, M. Kom",
		id : "1"
	},
	{
		jurusan : "Teknik Mesin",
		kaprodi : "Mudrajat, S. Kom, M. Kom",
		id : "2"
	},
	{
		jurusan : "Sistem Informasi",
		kaprodi : "Palano Pela, S. Kom, M. Kom",
		id : "3"
	}
]

var dataMahasiswa = [
	{
		id : "1",
		name : "Muhammad Irfansyahfalah",
		umur : "22",
		jenisKelamin : "L"
	},
	{
		id : "2",
		name : "Ririn Ga Peka",
		umur : "22",
		jenisKelamin : "P"
	},
	{
		id : "3",
		name : "Ririn Weee",
		umur : "22",
		jenisKelamin : "P"
	},
	{
		id : "4",
		name : "Irfansyahfalah",
		umur : "22",
		jenisKelamin : "L"
	},
]





//API using type, this is schema, schema disini objek memiliki fields dan name
const JurusanType = new GraphQLObjectType({
	name : 'jurusan',
	fields:()=> ({
		id : {type : GraphQLID},
		jurusan : {type : GraphQLString},
		kaprodi : {type : GraphQLString}
	})
});


//API using type, this is schema, schema disini objek memiliki fields dan name
const MahasiswaType = new GraphQLObjectType({
	name : 'mahasiswa',
	fields:()=> ({
		id : {type : GraphQLID},
		name : {type : GraphQLString},
		umur : {type : GraphQLInt},
		jenisKelamin : {type : GraphQLString}
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
			type : MahasiswaType, //mengarah ke JurusanType
			args : {
				id : {
					type : GraphQLID
				}
			},
			resolve(parent, args){
				console.log(typeof(args.id));
				return _.find(dataMahasiswa, {
					id: args.id
				});
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query : RootQuery
})
