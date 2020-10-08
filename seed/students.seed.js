const axios = require('axios');

const uri = 'http://localhost:3000/api/v1';

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNGMwMWE4MDg0YWE1OTZlMGE4MDBlYiIsImVtYWlsIjoiZmVyaWRAZ21haWwuY29tIiwicm9sZSI6IkdVRVNUIiwiaXNHcmFudGVkIjpmYWxzZSwiaWF0IjoxNjAyMTUzOTQ2LCJleHAiOjE2MzM2ODk5NDZ9.1ds_gNUbh8iSAhVOmLf9fTZjg1Ub4zYIjWJP1kY4-uI'
    }
}

let groupId;

const saveNewStudent = async (student, groupId) => {
    axios
        .post(`${uri}/students/add`, student, axiosConfig)
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res.data)
            return res.data;
        })
        .catch((error) => {
            console.error(error)
        })

}

axios
    .post(`${uri}/groups/add`,

        {
            label: "3ScExp Lycée Mahdia",
            owner: "5f4c01a8084aa596e0a800eb"
        },
        axiosConfig
    )
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res.data);
        groupId = res.data.payload._id;
        return groupId;
    }).then(groupId => {
        console.log('Inside 2nd then => GroupId: ', groupId);
        const students = [
            {
                group: groupId,
                firstname: "Amine",
                lastname: "BEN TOUMIA",
                gender: "Homme",
                loginname: "AB003",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Fethi",
                lastname: "ZEGNANI",
                gender: "Homme",
                loginname: "FZ003",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Heni",
                lastname: "NASRALLAH",
                gender: "Homme",
                loginname: "HN004",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Leila",
                lastname: "SFAR",
                gender: "Femme",
                loginname: "LS005",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Hejer",
                lastname: "CHANTOURI",
                gender: "Femme",
                loginname: "HC006",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Sami",
                lastname: "NASRALLAH",
                gender: "Homme",
                loginname: "SN007",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Wahid",
                lastname: "HELALI",
                gender: "Homme",
                loginname: "WH008",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Ali",
                lastname: "Ben Hammouda",
                gender: "Homme",
                loginname: "ABH003",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Omrane",
                lastname: "Kilani",
                gender: "Homme",
                loginname: "OK003",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Ferid",
                lastname: "HELALI",
                gender: "Homme",
                loginname: "FH004",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Lamia",
                lastname: "GANDOURA",
                gender: "Femme",
                loginname: "LG005",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Sonia",
                lastname: "BEN OTHMAEN",
                gender: "Femme",
                loginname: "SBO006",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Salem",
                lastname: "REJEB",
                gender: "Homme",
                loginname: "SR007",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },
            {
                group: groupId,
                firstname: "Mohamed Ala",
                lastname: "HELALI",
                gender: "Homme",
                loginname: "AH008",
                password: "toto",
                creator: "5f4c01a8084aa596e0a800eb"

            },

        ];

        students.map(
            (student) => {
                let saved = saveNewStudent(student, groupId);
                console.log('Saved Student: ', saved);
            }
        );
        

    })
    .catch((error) => {
        console.error(error)
    });











console.log(' .... :) ....');