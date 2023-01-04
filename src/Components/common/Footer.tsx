import React from 'react';
import styled from 'styled-components';

/**
 * @description Footer 컴포넌트
 */

function Footer() {
    return (
        <FooterWrap>
            해당 프로젝트는 Study를 위한 Toy Project 입니다.
        </FooterWrap>
    );
}

export default Footer;

const FooterWrap = styled.footer`
    padding: 80px 0;
    margin-top: -50px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #fff;
`;