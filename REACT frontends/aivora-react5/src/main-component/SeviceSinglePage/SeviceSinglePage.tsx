import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import ServiceDetails from "./ServiceDetails";

const SeviceSinglePage: React.FC = () => {
    return (
        <Fragment>
            <div className='about-page inner-page'>
                <div className="body_wrap o-clip">
                    <Header />
                    <main>
                        <PageTitle pageTitle="Service details" pagesub="Service details" />
                        <ServiceDetails />
                    </main>
                    <Footer />
                    <Scrollbar />
                </div>
            </div>
        </Fragment>
    );
};

export default SeviceSinglePage;
