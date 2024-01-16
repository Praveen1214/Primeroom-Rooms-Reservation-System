import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { Divider, Space, Tag } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Rooms from "../components/Rooms";
import Bookings from "../components/Bookings";
import Addroom from "../components/Addroom";
import User from "../components/User";

const { TabPane } = Tabs;

function Adminscreen() {
  return (
    <div className="mt-3 ml-3 bs">
      <h1>Admin Screen</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Rooms" key="3">
          <Addroom></Addroom>
        </TabPane>
        <TabPane tab="User" key="4">
          <User />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;
