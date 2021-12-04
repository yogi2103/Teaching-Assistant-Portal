import styled from 'styled-components';



export const NavbarWrapper=styled.div`
    background-color: black;
    height: 10vh;
    width: 100vw;
`
export const Container=styled.div`
    display:flex;
    flex-direction:column;
`
export const AuthContainer=styled.div`
    width:50%;
    height:100%;
    border:1px solid black;
    margin:auto;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    margin-top:10vh;

`
export const Title=styled.p`
    font-size:3rem;
    height:20%;
`
export const Form=styled.form`
    height:80%;
    border:1px solid;
    width:80%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
export const Input=styled.input`

`
export const Label=styled.label`
    font-size:1.5rem;
`
export const  FormGroup=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:10px;
`