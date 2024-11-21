import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <div>
        <p>Tech'her</p>
      </div>
      <div>
        <Link href="#">Message</Link>
        <Link href="#">Notification</Link>
        <Link href="#">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
