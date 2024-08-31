import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { AcmeLogo } from "./icons";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Router, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Caret, EmailIcon } from "@/utils/icons";
import { ProfileDrop } from "./commonComponents";
import { LoginModal, OtpModal, SignUpModal } from "@/utils/modal";
import Actress from '../utils/images/actress.gif'
import Entertainment from '../utils/images/juggling.gif'
import Health from '../utils/images/health-report.gif'
import Technology from '../utils/images/microchip.gif'
import Scandal from '../utils/images/angry.gif'
import Lifestyle from '../utils/images/yoga_17091653.gif'
import SoldOut from '../utils/images/sold-out.gif'
import Drama from '../utils/images/masks.gif'
import Image from "next/image";
import './header.css'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const selectedCity = useSelector(state => state.selectedCity)
    const loginData = useSelector(state => state.loginData)
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch();

    const menuItems = [
        { label: "Home", route: "/" },
        { label: "Explore", route: "/dashboard" },
        { label: "Select Location" }
    ];

    return (
        <div>
            <div style={{ padding: "24px" }}>
                <div className="row">
                    <div className="col-md-6">
                        <span>Saturday, August 31, 2024</span>
                    </div>
                    <div className="col-md-6" style={{ textAlign: "end", color: "#E04040" }}>
                        <span style={{ cursor: "pointer" }}>About</span>
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <span style={{ cursor: "pointer" }}>Contact</span>
                    </div>
                </div>
            </div>
            <hr style={{ margin: "0px" }} />
            <div style={{ padding: "24px" }}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                    <div className="col-md-4">
                        <div>
                            <div style={{ marginLeft: '30px' }}><EmailIcon /></div>
                            <p className="font-bold text-inherit">NEWSLETTER</p>
                        </div>
                    </div>
                    <div className="col-md-4" style={{ textAlign: "center" }}>
                        <span style={{ fontWeight: "bolder", fontSize: "30px" }}>NEWS PORTAL</span>
                        <p className="font-bold text-inherit">Gossip & Lifestyle Online Magazine</p>
                    </div>
                    <div className="col-md-4" style={{ textAlign: "end" }}>
                        <span style={{ fontWeight: "bolder" }}>| </span><span style={{ cursor: "pointer", color: "#E04040", fontWeight: "bold" }}>MY ACCOUNT</span><span style={{ fontWeight: "bolder" }}> |</span>
                    </div>
                </div>
            </div>
            <hr style={{ margin: "0px" }} />
            <Navbar style={{ padding: "0px" }} onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand style={{ marginTop: "50px" }}>
                        <AcmeLogo />
                        <p className="font-bold text-inherit hoverRef" style={{ marginTop: "16px" }}>ALL</p>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent justify="center" style={{ marginTop: "50px" }}>
                    <NavbarItem>
                        <div style={{ textAlign: '-webkit-center', cursor: 'pointer' }}>
                            <Image src={Entertainment} style={{ width: '50px' }} />
                            <span style={{ marginTop: '15px', fontSize: '14px' }} className="font-bold text-inherit hoverRef myDIV">ENTERTAINMENT</span>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div style={{ textAlign: '-webkit-center', cursor: 'pointer' }}>
                            <Image src={Actress} style={{ width: '50px' }} />
                            <span style={{ marginTop: '15px', fontSize: '14px' }} className="font-bold text-inherit hoverRef">CELEBRITY</span>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div style={{ textAlign: '-webkit-center', cursor: 'pointer' }}>
                            <Image src={Scandal} style={{ width: '50px' }} />
                            <span style={{ marginTop: '15px', fontSize: '14px' }} className="font-bold text-inherit hoverRef">SCANDALS</span>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div style={{ textAlign: '-webkit-center', cursor: 'pointer' }}>
                            <Image src={Drama} style={{ width: '50px' }} />
                            <span style={{ marginTop: '15px', fontSize: '14px' }} className="font-bold text-inherit hoverRef">DRAMA</span>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div style={{ textAlign: '-webkit-center', cursor: 'pointer' }}>
                            <Image src={Lifestyle} style={{ width: '50px' }} />
                            <span style={{ marginTop: '15px', fontSize: '14px' }} className="font-bold text-inherit hoverRef">LIFESTYLE</span>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div style={{ textAlign: '-webkit-center', cursor: 'pointer' }}>
                            <Image src={Technology} style={{ width: '50px' }} />
                            <span style={{ marginTop: '15px', fontSize: '14px' }} className="font-bold text-inherit hoverRef">TECHNOLOGY</span>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div style={{ textAlign: '-webkit-center', cursor: 'pointer' }}>
                            <Image src={Health} style={{ width: '50px' }} />
                            <span style={{ marginTop: '15px', fontSize: '14px' }} className="font-bold text-inherit hoverRef">HEALTH</span>
                        </div>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem role="button" key={`${item}-${index}`}>
                            <Link
                                onClick={() => {
                                    if (item.label == "Select Location") {
                                        dispatch({ type: "CITIESTMODAL", payload: true })
                                    }
                                }}
                                color={'danger'}
                                className="w-full"
                                href={item?.route ? item?.route : "#"}
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
            <hr style={{ margin: "40px 0px 0px 0px" }} />
            <div className="hoverRef hide">
                <div style={{ position: "absolute", left: "35%", display: "inline-block", padding: "20px", border: "2.5px solid #c7c8c9" }}>
                    <Image style={{ width: "200px" }} src={SoldOut} />
                    <span style={{ fontWeight: "500" }}>Hi This is Shivram kashyap Presenting news</span>
                </div>
            </div>
            <div className="hide">I am shown when someone hovers over the div above.</div>
        </div>

    );
}
