import React from 'react';
import styled from 'styled-components';

function Footer() {
    return (
        <FooterWrap>
            © Copyright 2023. ToyProject All rights reserved.
        </FooterWrap>
    );
}

export default Footer;


const FooterWrap = styled.footer`
    position: relative;
    bottom: 50px;
    font-size: 13px;
    text-align: center;
    color: #7c7c7c;
`;