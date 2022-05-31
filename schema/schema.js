const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema  } = graphql;
const _ = require('lodash');


///Dummy
var jurusanx = [
	{
		jurusan : "TK",
		kaprodi : "Ipan",
		id : "1"
	},
	{
		jurusan : "TI",
		kaprodi : "Ipan2",
		id : "2"
	},
	{
		jurusan : "TM",
		kaprodi : "Ipan3",
		id : "3"
	}
]


//API using type, this is schema
const JurusanType = new GraphQLObjectType({
	name : 'jurusan',
	fields:()=> ({
		id : {type : GraphQLString},
		jurusan : {type : GraphQLString},
		kaprodi : {type : GraphQLString}
	})
});


//RootQuery adalah directory utama, root query mengakses ke data dummy, yang mana data dummy menyesuaikan diri ke JurusanType
const RootQuery = new GraphQLObjectType({
	name : 'RootQueryType',
	fields : {
		prodi : {
			type : JurusanType,
			args : {
				id : {
					type : GraphQLString
				}
			},
			resolve(parent, args){
				return _.find(jurusanx, {
					id: args.id
				});
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query : RootQuery
})
