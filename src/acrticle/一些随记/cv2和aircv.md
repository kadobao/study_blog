---
title: cv2和aircv
icon: 
order: 8
category:
  - 一些随记
tag:
  - python
---



::: details 点击展开项目代码

```py
# import aircv as ac

# # 读取大图和小图
# large_image_path = r"C:\Users\cf\Pictures\Screenshots\photo_2024-10-10_11-22-22.jpg"
# small_image_path = r"C:\Users\cf\Pictures\Screenshots\photo_2024-10-10_11-00-05(1).png"

# large_image = ac.imread(large_image_path)
# small_image = ac.imread(small_image_path)

# # 进行模板匹配
# match_result = ac.find_template(large_image, small_image)

# # 输出匹配结果
# if match_result:
#     print("匹配成功！坐标：", match_result['result'])
#     print("相似度：", match_result['confidence'])
# else:
#     print("没有找到匹配的图像。")







import aircv as ac
import cv2

# 读取大图和小图
large_image_path = r"C:\Users\xc\Pictures\Screenshots\photo_2024-10-10_11-22-22.jpg"
small_image_path = r"C:\Users\xc\Pictures\Screenshots\photo_2024-10-10_11-22-22(1).png"

large_image = ac.imread(large_image_path)
small_image = ac.imread(small_image_path)

# 进行模板匹配
match_result = ac.find_template(large_image, small_image)

# 检查是否匹配成功
if match_result:
    print("匹配成功！坐标：", match_result['result'])
    print("相似度：", match_result['confidence'])
    
    # 获取匹配到的中心点坐标
    center_x, center_y = match_result['result']
    
    # 获取小图的宽高
    small_h, small_w = small_image.shape[:2]
    
    # 计算左上角和右下角坐标
    top_left = (int(center_x - small_w / 2), int(center_y - small_h / 2))
    bottom_right = (int(center_x + small_w / 2), int(center_y + small_h / 2))
    
    # 打印矩形的左上角和右下角坐标
    print("矩形框的左上角坐标：", top_left)
    print("矩形框的右下角坐标：", bottom_right)
    
    # 在大图上绘制红色矩形框
    cv2.rectangle(large_image, top_left, bottom_right, (0, 0, 255), 2)  # 红色 (BGR: 0, 0, 255)
    
    # 显示带矩形框的结果
    cv2.imshow("Matched Result", large_image)
    cv2.waitKey(0)  # 等待按键关闭窗口
    cv2.destroyAllWindows()  # 关闭所有窗口
else:
    print("没有找到匹配的图像。")











# import aircv as ac
# import cv2

# # 读取大图
# large_image_path = r"C:\Users\cf\Pictures\Screenshots\photo_2024-10-10_11-22-22.jpg"
# large_image = ac.imread(large_image_path)

# # 第一组矩形框的顶点坐标
# top_left_1 = (40, 82)  # 第一矩形框的左上角坐标
# bottom_right_1 = (68, 108)  # 第一矩形框的右下角坐标

# # 第二组矩形框的顶点坐标
# top_left_2 = (101, 81)  # 第二矩形框的左上角坐标
# bottom_right_2 = (128, 108)  # 第二矩形框的右下角坐标

# # 绘制第一个红色矩形框
# cv2.rectangle(large_image, top_left_1, bottom_right_1, (0, 0, 255), 2)  # 红色 (BGR: 0, 0, 255)

# # 绘制第二个红色矩形框
# cv2.rectangle(large_image, top_left_2, bottom_right_2, (0, 0, 255), 2)  # 红色 (BGR: 0, 0, 255)

# # 显示带矩形框的结果
# cv2.imshow("Matched Result", large_image)
# cv2.waitKey(0)  # 等待按键关闭窗口
# cv2.destroyAllWindows()  # 关闭所有窗口

```

:::